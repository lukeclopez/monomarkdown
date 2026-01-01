import * as vscode from "vscode";
import { createDecorationTypes } from "./decorations";
import { DecorationManager } from "./decorationManager";

export function activate(context: vscode.ExtensionContext) {
  console.log("Monomarkdown is active");

  const decorations = createDecorationTypes();
  const manager = new DecorationManager(decorations);

  if (manager.getActiveEditor()) {
    manager.updateDecorations();
  }

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      manager.setActiveEditor(editor);
      if (editor) {
        manager.updateDecorations();
      }
    }),

    vscode.workspace.onDidChangeTextDocument((event) => {
      const activeEditor = manager.getActiveEditor();
      if (activeEditor && event.document === activeEditor.document) {
        manager.updateDecorations();
      }
    }),

    vscode.window.onDidChangeTextEditorSelection((event) => {
      const activeEditor = manager.getActiveEditor();
      if (activeEditor && event.textEditor === activeEditor) {
        manager.updateDecorations();
      }
    })
  );
}

export function deactivate() {}
