import * as vscode from "vscode";

export default abstract class FilesUtil {
  static async readFile(path: string): Promise<string> {
    const fileContentBuffer = await vscode.workspace.fs.readFile(
      vscode.Uri.parse(path)
    );
    return Buffer.from(fileContentBuffer).toString("utf-8");
  }

  static listFilesInFolderRec(folder: string): Thenable<vscode.Uri[]> {
    return vscode.workspace.findFiles(`${folder}/**/*.py`);
  }
}
