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
    let astAsString: string = await AstGenerator.runCode(fileContent);
    astAsString = astAsString.replace(/ast_type/g, "type");
    const ast = JSON.parse(astAsString);
    return esquery(ast, 'ImportFrom[module="bolinette"]').length > 0;
  }
}
