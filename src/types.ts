import * as vscode from "vscode";

export interface LineContext {
  lineNum: number;
  text: string;
  range: vscode.Range;
  isActive: boolean;
}

export interface ParseResult {
  hideRanges: vscode.Range[];
  decorationRanges: vscode.Range[];
}

export interface HeaderParseResult extends ParseResult {
  level: number;
}

export interface DecorationRanges {
  hide: vscode.Range[];
  inlineCode: vscode.Range[];
  blockCode: vscode.Range[];
  quote: vscode.Range[];
  bullet: vscode.Range[];
  hr: vscode.Range[];
  taskUnchecked: vscode.Range[];
  taskChecked: vscode.Range[];
  tablePipe: vscode.Range[];
  linkText: vscode.Range[];
  headers: { [level: number]: vscode.Range[] };
}

export interface DecorationTypes {
  hide: vscode.TextEditorDecorationType;
  inlineCode: vscode.TextEditorDecorationType;
  blockCode: vscode.TextEditorDecorationType;
  quote: vscode.TextEditorDecorationType;
  bullet: vscode.TextEditorDecorationType;
  hr: vscode.TextEditorDecorationType;
  taskUnchecked: vscode.TextEditorDecorationType;
  taskChecked: vscode.TextEditorDecorationType;
  tablePipe: vscode.TextEditorDecorationType;
  linkText: vscode.TextEditorDecorationType;
  headers: { [level: number]: vscode.TextEditorDecorationType };
}
