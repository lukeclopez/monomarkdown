import * as vscode from "vscode";
import { LineContext, ParseResult } from "../types";
import { PATTERNS } from "../patterns";

export function parseLinks(ctx: LineContext): ParseResult {
  const hideRanges: vscode.Range[] = [];
  const decorationRanges: vscode.Range[] = [];

  const regex = new RegExp(PATTERNS.link.source, "g");
  let match;

  while ((match = regex.exec(ctx.text))) {
    const textLen = match[1].length;

    decorationRanges.push(
      new vscode.Range(
        ctx.lineNum,
        match.index + 1,
        ctx.lineNum,
        match.index + 1 + textLen
      )
    );

    if (!ctx.isActive) {
      hideRanges.push(
        new vscode.Range(ctx.lineNum, match.index, ctx.lineNum, match.index + 1)
      );

      const midStart = match.index + 1 + textLen;
      hideRanges.push(
        new vscode.Range(
          ctx.lineNum,
          midStart,
          ctx.lineNum,
          match.index + match[0].length
        )
      );
    }
  }

  return { hideRanges, decorationRanges };
}
