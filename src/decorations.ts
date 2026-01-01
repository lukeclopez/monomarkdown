import * as vscode from "vscode";
import { CONFIG } from "./config";
import { DecorationTypes } from "./types";

export function createDecorationTypes(): DecorationTypes {
  const hide = vscode.window.createTextEditorDecorationType({
    color: CONFIG.styles.hide.color,
    textDecoration: CONFIG.styles.hide.textDecoration,
  });

  const inlineCode = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor(CONFIG.themeColors.codeBackground),
    borderRadius: CONFIG.styles.inlineCode.borderRadius,
    textDecoration: CONFIG.styles.inlineCode.textDecoration,
  });

  const blockCode = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor(CONFIG.themeColors.codeBackground),
    isWholeLine: CONFIG.styles.blockCode.isWholeLine,
    textDecoration: CONFIG.styles.blockCode.textDecoration,
  });

  const quote = vscode.window.createTextEditorDecorationType({
    borderWidth: CONFIG.styles.quote.borderWidth,
    borderStyle: CONFIG.styles.quote.borderStyle,
    borderColor: new vscode.ThemeColor(CONFIG.themeColors.quoteBorder),
    isWholeLine: CONFIG.styles.quote.isWholeLine,
    before: {
      contentText: CONFIG.styles.quote.beforeContent,
      color: "transparent",
    },
  });

  const bullet = vscode.window.createTextEditorDecorationType({
    color: CONFIG.styles.bullet.color,
    textDecoration: CONFIG.styles.bullet.textDecoration,
    before: {
      contentText: CONFIG.symbols.bullet,
      color: new vscode.ThemeColor(CONFIG.themeColors.foreground),
    },
  });

  const hr = vscode.window.createTextEditorDecorationType({
    color: CONFIG.styles.hr.color,
    textDecoration: CONFIG.styles.hr.textDecoration,
    isWholeLine: CONFIG.styles.hr.isWholeLine,
    borderWidth: CONFIG.styles.hr.borderWidth,
    borderStyle: CONFIG.styles.hr.borderStyle,
    borderColor: new vscode.ThemeColor(CONFIG.themeColors.lineNumber),
  });

  const taskUnchecked = vscode.window.createTextEditorDecorationType({
    color: CONFIG.styles.task.color,
    textDecoration: CONFIG.styles.task.textDecoration,
    before: {
      contentText: CONFIG.symbols.checkbox.unchecked,
      color: new vscode.ThemeColor(CONFIG.themeColors.foreground),
    },
  });

  const taskChecked = vscode.window.createTextEditorDecorationType({
    color: CONFIG.styles.task.color,
    textDecoration: CONFIG.styles.task.textDecoration,
    before: {
      contentText: CONFIG.symbols.checkbox.checked,
      color: new vscode.ThemeColor(CONFIG.themeColors.foreground),
    },
  });

  const tablePipe = vscode.window.createTextEditorDecorationType({
    opacity: CONFIG.styles.tablePipe.opacity,
  });

  const linkText = vscode.window.createTextEditorDecorationType({
    fontWeight: CONFIG.styles.link.fontWeight,
    textDecoration: CONFIG.styles.link.textDecoration,
  });

  const headers: { [level: number]: vscode.TextEditorDecorationType } = {};
  const headerSizes = [
    CONFIG.headers.h1,
    CONFIG.headers.h2,
    CONFIG.headers.h3,
    CONFIG.headers.h4,
    CONFIG.headers.h5,
    CONFIG.headers.h6,
  ];

  for (let i = 1; i <= 6; i++) {
    headers[i] = vscode.window.createTextEditorDecorationType({
      textDecoration: `none; font-size: ${headerSizes[i - 1]};`,
      fontWeight: CONFIG.styles.header.fontWeight,
    });
  }

  return {
    hide,
    inlineCode,
    blockCode,
    quote,
    bullet,
    hr,
    taskUnchecked,
    taskChecked,
    tablePipe,
    linkText,
    headers,
  };
}
