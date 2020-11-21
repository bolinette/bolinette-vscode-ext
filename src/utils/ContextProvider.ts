import { ExtensionContext } from "vscode";

export default class ContextProvider {
  private static context: ExtensionContext;

  static init(context: ExtensionContext) {
    ContextProvider.context = context;
  }

  static get() {
    return ContextProvider.context;
  }
}
