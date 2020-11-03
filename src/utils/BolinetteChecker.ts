import * as vscode from "vscode";
import * as esquery from "esquery";
import FilesUtil from "./FilesUtil";
import AstGenerator from "./AstGenerator";

export default abstract class BolinetteChecker {
  static async isBolinetteApp() {
    const matchingFiles: vscode.Uri[] = await vscode.workspace.findFiles(
      "app.py"
    );
    if (matchingFiles.length === 0) {
      return false;
    }

    const fileContent: string = await FilesUtil.readFile(matchingFiles[0].path);
    const ast: any = await AstGenerator.parseCode(fileContent);
    return esquery(ast, 'ImportFrom[module="bolinette"]').length > 0;
  }
}
