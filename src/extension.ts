import * as vscode from "vscode";
import BolinetteChecker from "./utils/BolinetteChecker";
import AstGenerator from "./utils/AstGenerator";
import BolinetteParser from "./core/BolinetteParser";

export async function activate(context: vscode.ExtensionContext) {
  AstGenerator.init(context);
  const isBolinetteApp = await BolinetteChecker.isBolinetteApp();
  console.log(`isBolinetteApp: ${isBolinetteApp}`);
  if (isBolinetteApp) {
    new BolinetteParser().run();
  }
}

export function deactivate() {}
