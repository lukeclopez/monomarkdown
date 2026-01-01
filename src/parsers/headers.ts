import * as vscode from "vscode";
import { LineContext, HeaderParseResult } from "../types";
import { PATTERNS } from "../patterns";

export function parseHeader(ctx: LineContext): HeaderParseResult | null {
  const match = ctx.text.match(PATTERNS.header);

  if (!match) {
    return null;
  }

  const level = match[1].length;
  const hashesLen = match[1].length;
  const hideRanges: vscode.Range[] = [];

  if (!ctx.isActive) {
    hideRanges.push(
      new vscode.Range(ctx.lineNum, 0, ctx.lineNum, hashesLen + 1)
    );
  }

  return {
    level,
    hideRanges,
    decorationRanges: [ctx.range],
  };
}
