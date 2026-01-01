import * as vscode from "vscode";
import { LineContext, ParseResult } from "../types";
import { PATTERNS } from "../patterns";

export interface TaskParseResult {
  uncheckedRanges: vscode.Range[];
  checkedRanges: vscode.Range[];
}

export function parseBullet(ctx: LineContext): ParseResult {
  const decorationRanges: vscode.Range[] = [];

  if (ctx.isActive) {
    return { hideRanges: [], decorationRanges };
  }

  const match = ctx.text.match(PATTERNS.unorderedList);

  if (!match) {
    return { hideRanges: [], decorationRanges };
  }

  const start = match[1].length;
  const end = start + 2;
  decorationRanges.push(new vscode.Range(ctx.lineNum, start, ctx.lineNum, end));

  return { hideRanges: [], decorationRanges };
}

export function parseTaskList(ctx: LineContext): TaskParseResult {
  const uncheckedRanges: vscode.Range[] = [];
  const checkedRanges: vscode.Range[] = [];

  if (ctx.isActive) {
    return { uncheckedRanges, checkedRanges };
  }

  const match = ctx.text.match(PATTERNS.taskList);

  if (!match) {
    return { uncheckedRanges, checkedRanges };
  }

  const start = match[1].length;
  const end = start + 5;
  const range = new vscode.Range(ctx.lineNum, start, ctx.lineNum, end);

  if (match[2] === "x") {
    checkedRanges.push(range);
  } else {
    uncheckedRanges.push(range);
  }

  return { uncheckedRanges, checkedRanges };
}
