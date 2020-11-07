import * as vscode from "vscode";
import BolinetteChecker from "./utils/BolinetteChecker";
import AstGenerator from "./utils/AstGenerator";
import BolinetteParser from "./core/BolinetteParser";

export async function activate(context: vscode.ExtensionContext) {
  AstGenerator.init(context);
  const isBolinetteApp = await BolinetteChecker.isBolinetteApp();
  console.log(`isBolinetteApp: ${isBolinetteApp}`);
  if (!isBolinetteApp) {
    return;
  }
  const parser = await new BolinetteParser().run();
  vscode.workspace.onDidSaveTextDocument((e) => {
    parser.updateProjectFile(e.uri.path);
  });
  vscode.workspace.onDidCreateFiles((e) => {
    e.files.forEach((file) => {
      parser.addProjectFile(file.path);
    });
  });
  vscode.workspace.onDidRenameFiles((e) => {
    e.files.forEach((file) => {
      parser.updateProjectFilePath(file.oldUri.path, file.newUri.path);
    });
  });
  vscode.workspace.onDidDeleteFiles((e) => {
    e.files.forEach((file) => {
      parser.removeProjectFile(file.path);
    });
  });
}

export function deactivate() {}
