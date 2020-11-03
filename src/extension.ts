import * as vscode from "vscode";
import BolinetteChecker from "./utils/BolinetteChecker";
import PythonCodeRunner from "./utils/AstGenerator";
import BolinetteParser from "./parser/BolinetteParser";

export async function activate(context: vscode.ExtensionContext) {
  PythonCodeRunner.init(context);
  const isBolinetteApp = await BolinetteChecker.isBolinetteApp();
  console.log(`isBolinetteApp: ${isBolinetteApp}`);
  if (isBolinetteApp) {
    new BolinetteParser().run();
  }
}

export function deactivate() {}
