import * as vscode from "vscode";
import * as filbert from "filbert";
import * as esquery from "esquery";

export default class BolinetteChecker {
  async isBolinetteApp() {
    const matchingFiles = await vscode.workspace.findFiles("app.py");
    if (matchingFiles.length === 0) {
      return false;
    }

    const fileContentBuffer = await vscode.workspace.fs.readFile(
      vscode.Uri.parse(matchingFiles[0].path)
    );
    const fileContent = Buffer.from(fileContentBuffer).toString("utf8");
    const ast = filbert.parse(fileContent);
    const bolinetteDeclarationQuery = esquery.query(
      ast,
      'VariableDeclarator[id.name="bolinette"]'
    );
    return bolinetteDeclarationQuery.length > 0;
  }
}
