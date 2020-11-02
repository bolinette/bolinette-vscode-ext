import * as vscode from "vscode";

export default abstract class FileReader {
  static async readFile(path: string) {
    const fileContentBuffer = await vscode.workspace.fs.readFile(
      vscode.Uri.parse(path)
    );
    return Buffer.from(fileContentBuffer).toString("utf8");
  }
}
