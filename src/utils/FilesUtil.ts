import * as vscode from "vscode";

export default abstract class FilesUtil {
  static async readFile(path: string) {
    const fileContentBuffer = await vscode.workspace.fs.readFile(
      vscode.Uri.parse(path)
    );
    return Buffer.from(fileContentBuffer).toString("utf-8");
  }

  static listRecursivelyFilesInFolder(folder: string) {
    return vscode.workspace.findFiles(`${folder}/**/*.py`);
  }
}
