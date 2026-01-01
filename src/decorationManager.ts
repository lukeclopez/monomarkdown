import * as vscode from "vscode";
import { DecorationTypes, DecorationRanges, LineContext } from "./types";
import {
  parseCodeFence,
  parseInlineCode,
  parseHeader,
  parseBold,
  parseItalic,
  parseStrikethrough,
  parseBullet,
  parseTaskList,
  parseBlockquote,
  parseHorizontalRule,
  parseTable,
  parseLinks,
} from "./parsers";

export class DecorationManager {
  private decorations: DecorationTypes;
  private activeEditor: vscode.TextEditor | undefined;

  constructor(decorations: DecorationTypes) {
    this.decorations = decorations;
    this.activeEditor = vscode.window.activeTextEditor;
  }

  setActiveEditor(editor: vscode.TextEditor | undefined): void {
    this.activeEditor = editor;
  }

  getActiveEditor(): vscode.TextEditor | undefined {
    return this.activeEditor;
  }

  updateDecorations(): void {
    if (
      !this.activeEditor ||
      this.activeEditor.document.languageId !== "markdown"
    ) {
      return;
    }

    const ranges = this.collectRanges();
    this.applyDecorations(ranges);
  }

  private collectRanges(): DecorationRanges {
    const ranges: DecorationRanges = {
      hide: [],
      inlineCode: [],
      blockCode: [],
      quote: [],
      bullet: [],
      hr: [],
      taskUnchecked: [],
      taskChecked: [],
      tablePipe: [],
      linkText: [],
      headers: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    };

    const document = this.activeEditor!.document;
    const lineCount = document.lineCount;
    let inCodeBlock = false;

    for (let i = 0; i < lineCount; i++) {
      const line = document.lineAt(i);
      const ctx: LineContext = {
        lineNum: i,
        text: line.text,
        range: line.range,
        isActive: this.isLineActive(i, line.text),
      };

      // Code fence handling
      const fenceResult = parseCodeFence(ctx);
      if (fenceResult.togglesCodeBlock) {
        ranges.blockCode.push(...fenceResult.decorationRanges);
        ranges.hide.push(...fenceResult.hideRanges);
        inCodeBlock = !inCodeBlock;
        continue;
      }

      if (inCodeBlock) {
        ranges.blockCode.push(ctx.range);
        continue;
      }

      // Headers
      const headerResult = parseHeader(ctx);
      if (headerResult) {
        ranges.headers[headerResult.level].push(
          ...headerResult.decorationRanges
        );
        ranges.hide.push(...headerResult.hideRanges);
        continue;
      }

      // Blockquotes
      const quoteResult = parseBlockquote(ctx);
      ranges.quote.push(...quoteResult.decorationRanges);
      ranges.hide.push(...quoteResult.hideRanges);

      // Horizontal rules
      const hrResult = parseHorizontalRule(ctx);
      if (hrResult.decorationRanges.length > 0) {
        ranges.hr.push(...hrResult.decorationRanges);
        ranges.hide.push(...hrResult.hideRanges);
        continue;
      }

      // Lists
      const bulletResult = parseBullet(ctx);
      ranges.bullet.push(...bulletResult.decorationRanges);

      const taskResult = parseTaskList(ctx);
      ranges.taskUnchecked.push(...taskResult.uncheckedRanges);
      ranges.taskChecked.push(...taskResult.checkedRanges);

      // Inline code
      const inlineCodeResult = parseInlineCode(ctx);
      ranges.inlineCode.push(...inlineCodeResult.decorationRanges);
      ranges.hide.push(...inlineCodeResult.hideRanges);

      // Formatting
      const boldResult = parseBold(ctx);
      ranges.hide.push(...boldResult.hideRanges);

      const italicResult = parseItalic(ctx);
      ranges.hide.push(...italicResult.hideRanges);

      const strikeResult = parseStrikethrough(ctx);
      ranges.hide.push(...strikeResult.hideRanges);

      // Links
      const linkResult = parseLinks(ctx);
      ranges.linkText.push(...linkResult.decorationRanges);
      ranges.hide.push(...linkResult.hideRanges);

      // Tables
      const tableResult = parseTable(ctx);
      ranges.tablePipe.push(...tableResult.decorationRanges);
    }

    return ranges;
  }

  private isLineActive(lineNum: number, lineText: string): boolean {
    for (const selection of this.activeEditor!.selections) {
      if (selection.active.line === lineNum) return true;
      if (
        selection.intersection(
          new vscode.Range(lineNum, 0, lineNum, lineText.length)
        )
      ) {
        return true;
      }
    }
    return false;
  }

  private applyDecorations(ranges: DecorationRanges): void {
    const editor = this.activeEditor!;

    editor.setDecorations(this.decorations.hide, ranges.hide);
    editor.setDecorations(this.decorations.inlineCode, ranges.inlineCode);
    editor.setDecorations(this.decorations.blockCode, ranges.blockCode);
    editor.setDecorations(this.decorations.quote, ranges.quote);
    editor.setDecorations(this.decorations.bullet, ranges.bullet);
    editor.setDecorations(this.decorations.hr, ranges.hr);
    editor.setDecorations(this.decorations.taskUnchecked, ranges.taskUnchecked);
    editor.setDecorations(this.decorations.taskChecked, ranges.taskChecked);
    editor.setDecorations(this.decorations.tablePipe, ranges.tablePipe);
    editor.setDecorations(this.decorations.linkText, ranges.linkText);

    for (let i = 1; i <= 6; i++) {
      editor.setDecorations(this.decorations.headers[i], ranges.headers[i]);
    }
  }
}
