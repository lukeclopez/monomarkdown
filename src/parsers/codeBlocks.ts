import * as vscode from "vscode";
import { LineContext, ParseResult } from "../types";
import { PATTERNS } from "../patterns";

export interface CodeBlockResult extends ParseResult {
  isBlockCode: boolean;
  togglesCodeBlock: boolean;
}

export function parseCodeFence(ctx: LineContext): CodeBlockResult {
  const match = ctx.text.match(PATTERNS.codeFence);

  if (!match) {
    return {
      hideRanges: [],
      decorationRanges: [],
      isBlockCode: false,
      togglesCodeBlock: false,
    };
  }

  const hideRanges: vscode.Range[] = [];
  const decorationRanges = [ctx.range];

  if (!ctx.isActive) {
    const startOff = match[1].length;
    const endOff = ctx.text.length;
    hideRanges.push(
      new vscode.Range(ctx.lineNum, startOff, ctx.lineNum, endOff)
    );
  }

  return {
    hideRanges,
    decorationRanges,
    isBlockCode: true,
    togglesCodeBlock: true,
  };
}

export function parseInlineCode(ctx: LineContext): ParseResult {
  const hideRanges: vscode.Range[] = [];
  const decorationRanges: vscode.Range[] = [];

  const regex = new RegExp(PATTERNS.inlineCode.source, "g");
  let match;

  while ((match = regex.exec(ctx.text))) {
    const startTicksLen = match[1].length;
    const fullStart = match.index;
    const fullEnd = match.index + match[0].length;

    if (ctx.isActive) {
      decorationRanges.push(
        new vscode.Range(ctx.lineNum, fullStart, ctx.lineNum, fullEnd)
      );
    } else {
      const contentStart = fullStart + startTicksLen;
      const contentEnd = fullEnd - startTicksLen;

      decorationRanges.push(
        new vscode.Range(ctx.lineNum, contentStart, ctx.lineNum, contentEnd)
      );
      hideRanges.push(
        new vscode.Range(
          ctx.lineNum,
          fullStart,
          ctx.lineNum,
          fullStart + startTicksLen
        )
      );
      hideRanges.push(
        new vscode.Range(ctx.lineNum, contentEnd, ctx.lineNum, fullEnd)
      );
    }
  }

  return { hideRanges, decorationRanges };
}
