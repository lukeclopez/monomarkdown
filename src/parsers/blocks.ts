import * as vscode from "vscode";
import { LineContext, ParseResult } from "../types";
import { PATTERNS } from "../patterns";

export function parseBlockquote(ctx: LineContext): ParseResult {
  const hideRanges: vscode.Range[] = [];
  const decorationRanges: vscode.Range[] = [];

  const match = ctx.text.match(PATTERNS.blockquote);

  if (!match) {
    return { hideRanges, decorationRanges };
  }

  decorationRanges.push(ctx.range);

  if (!ctx.isActive) {
    const gtStart = match[1].length;
    const content = match[2];
    const hideLen = 1 + (content.startsWith(" ") ? 1 : 0);
    hideRanges.push(
      new vscode.Range(ctx.lineNum, gtStart, ctx.lineNum, gtStart + hideLen)
    );
  }

  return { hideRanges, decorationRanges };
}

export function parseHorizontalRule(ctx: LineContext): ParseResult {
  const hideRanges: vscode.Range[] = [];
  const decorationRanges: vscode.Range[] = [];

  const match = ctx.text.match(PATTERNS.horizontalRule);

  if (!match || ctx.isActive) {
    return { hideRanges, decorationRanges };
  }

  decorationRanges.push(ctx.range);
  hideRanges.push(ctx.range);

  return { hideRanges, decorationRanges };
}

export function parseTable(ctx: LineContext): ParseResult {
  const decorationRanges: vscode.Range[] = [];

  if (ctx.isActive) {
    return { hideRanges: [], decorationRanges };
  }

  if (!PATTERNS.table.test(ctx.text)) {
    return { hideRanges: [], decorationRanges };
  }

  for (let j = 0; j < ctx.text.length; j++) {
    if (ctx.text[j] === "|") {
      decorationRanges.push(
        new vscode.Range(ctx.lineNum, j, ctx.lineNum, j + 1)
      );
    }
  }

  return { hideRanges: [], decorationRanges };
}
