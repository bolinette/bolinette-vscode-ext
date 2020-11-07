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

  static getRootBasedFilePath(filePath: string) {
    const workspacePath = `${vscode.workspace.workspaceFolders?.[0]?.uri.path}/`;
    return filePath.substr(workspacePath.length);
  }

  static getFileType(filePath: string) {
    return FilesUtil.getRootBasedFilePath(filePath).split(/(\/|\\)/)[0];
  }

  static isFileSupported(filePath: string) {
    if (filePath.indexOf(".") === -1) {
      return false;
    }
    if (filePath.substr(filePath.lastIndexOf(".")) !== ".py") {
      return false;
    }
    const rootBasedFilePath = FilesUtil.getRootBasedFilePath(filePath);
    if (
      rootBasedFilePath.indexOf("/") === -1 &&
      rootBasedFilePath.indexOf("\\") === -1
    ) {
      return false;
    }
    return true;
  }
}
