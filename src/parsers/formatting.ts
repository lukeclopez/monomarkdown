import * as vscode from "vscode";
import { LineContext, ParseResult } from "../types";
import { PATTERNS } from "../patterns";

export function parseBold(ctx: LineContext): ParseResult {
  const hideRanges: vscode.Range[] = [];

  if (ctx.isActive) {
    return { hideRanges, decorationRanges: [] };
  }

  const regex = new RegExp(PATTERNS.bold.source, "g");
  let match;

  while ((match = regex.exec(ctx.text))) {
    hideRanges.push(
      new vscode.Range(ctx.lineNum, match.index, ctx.lineNum, match.index + 2)
    );
    hideRanges.push(
      new vscode.Range(
        ctx.lineNum,
        match.index + match[0].length - 2,
        ctx.lineNum,
        match.index + match[0].length
      )
    );
  }

  return { hideRanges, decorationRanges: [] };
}

export function parseItalic(ctx: LineContext): ParseResult {
  const hideRanges: vscode.Range[] = [];

  if (ctx.isActive) {
    return { hideRanges, decorationRanges: [] };
  }

  const regex = new RegExp(PATTERNS.italic.source, "g");
  let match;

  while ((match = regex.exec(ctx.text))) {
    hideRanges.push(
      new vscode.Range(ctx.lineNum, match.index, ctx.lineNum, match.index + 1)
    );
    hideRanges.push(
      new vscode.Range(
        ctx.lineNum,
        match.index + match[0].length - 1,
        ctx.lineNum,
        match.index + match[0].length
      )
    );
  }

  return { hideRanges, decorationRanges: [] };
}

export function parseStrikethrough(ctx: LineContext): ParseResult {
  const hideRanges: vscode.Range[] = [];

  if (ctx.isActive) {
    return { hideRanges, decorationRanges: [] };
  }

  const regex = new RegExp(PATTERNS.strikethrough.source, "g");
  let match;

  while ((match = regex.exec(ctx.text))) {
    hideRanges.push(
      new vscode.Range(ctx.lineNum, match.index, ctx.lineNum, match.index + 2)
    );
    hideRanges.push(
      new vscode.Range(
        ctx.lineNum,
        match.index + match[0].length - 2,
        ctx.lineNum,
        match.index + match[0].length
      )
    );
  }

  return { hideRanges, decorationRanges: [] };
}
