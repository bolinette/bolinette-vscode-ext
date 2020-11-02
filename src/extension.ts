import * as vscode from "vscode";
import BolinetteChecker from "./utils/BolinetteChecker";
import PythonCodeRunner from "./utils/PythonCodeRunner";

export async function activate(context: vscode.ExtensionContext) {
  PythonCodeRunner.init(context);
  const isBolinetteApp = await BolinetteChecker.isBolinetteApp(context);
  console.log(`isBolinetteApp: ${isBolinetteApp}`);
}

export function deactivate() {}
