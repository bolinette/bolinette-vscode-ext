import * as vscode from "vscode";
import BolinetteChecker from "./BolinetteChecker";

export async function activate(context: vscode.ExtensionContext) {
  const isBolinetteApp = await new BolinetteChecker().isBolinetteApp();
  console.log(`isBolinetteApp: ${isBolinetteApp}`);
}

export function deactivate() {}
