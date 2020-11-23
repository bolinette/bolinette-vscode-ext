import * as vscode from "vscode";
import BolinetteChecker from "./utils/BolinetteChecker";
import AstGenerator from "./utils/AstGenerator";
import BolinetteParser from "./core/BolinetteParser";
import FilesUtil from "./utils/FilesUtil";
import { BolinetteAutocomplete } from "./core/BolinetteAutocomplete";
import ContextProvider from "./utils/ContextProvider";
import FileFactory from "./models/FileFactory";

let activeTextEditor: vscode.TextEditor | undefined;
export async function activate(context: vscode.ExtensionContext) {
  ContextProvider.init(context);
  let isBolinetteApp;
  try {
    isBolinetteApp = await BolinetteChecker.isBolinetteApp();
  } catch (e) {
    console.error(e);
    return;
  }
  console.log(`isBolinetteApp: ${isBolinetteApp}`);
  if (!isBolinetteApp) {
    return;
  }

  const project = await new BolinetteParser().run();
  console.log("Parser ready");

  vscode.workspace.onDidSaveTextDocument((e) => {
    project.updateFileAst(e.uri.path);
  });
  vscode.workspace.onDidCreateFiles((e) => {
    e.files.forEach((file) => {
      if (FilesUtil.isFileSupported(file.path)) {
        const newFile = FileFactory.create(file.path);
        project.addFile(newFile);
      }
    });
  });
  vscode.workspace.onDidRenameFiles((e) => {
    e.files.forEach((file) => {
      if (!FilesUtil.isFileSupported(file.oldUri.path)) {
        return;
      }
      if (
        FilesUtil.isFileSupported(file.oldUri.path) &&
        !FilesUtil.isFileSupported(file.newUri.path)
      ) {
        project.removeFile(file.oldUri.path);
        return;
      }
      project.updateFilePath(file.oldUri.path, file.newUri.path);
    });
  });
  vscode.workspace.onDidDeleteFiles((e) => {
    e.files.forEach((file) => {
      if (FilesUtil.isFileSupported(file.path)) {
        project.removeFile(file.path);
      }
    });
  });

  activeTextEditor = vscode.window.activeTextEditor;
  vscode.window.onDidChangeActiveTextEditor((e) => {
    if (activeTextEditor?.document.isDirty) {
      const lastViewedFilePath = activeTextEditor.document.uri.path;
      if (FilesUtil.isFileSupported(lastViewedFilePath)) {
        project.updateFileAst(
          lastViewedFilePath,
          activeTextEditor.document.getText()
        );
      }
    }
    activeTextEditor = e;
  });

  new BolinetteAutocomplete(project).registerAutocomplete();
}

export function deactivate() {}
