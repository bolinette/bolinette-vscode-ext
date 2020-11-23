import * as vscode from "vscode";
import * as path from "path";

export default abstract class FilesUtil {
  static async readFile(path: string): Promise<string> {
    const fileContentBuffer = await vscode.workspace.fs.readFile(
      vscode.Uri.parse(path)
    );
    return Buffer.from(fileContentBuffer).toString("utf-8");
  }

  static async listFilesInWorkspace(folder: string) {
    const files = [
      ...(await vscode.workspace.findFiles(`*/${folder}/**/*.py`)),
      ...(await vscode.workspace.findFiles(
        `**/bolinette/defaults/${folder}/**/*.py`
      )),
    ];
    return files.map((file) => file.path);
  }

  static isSubdirectory(parent: string, child: string) {
    return path.relative(parent, child);
  }

  static getRootBasedFilePath(filePath: string) {
    const workspacePath = `${vscode.workspace.workspaceFolders?.[0]?.uri.path}/`;
    return filePath.substr(workspacePath.length);
  }

  static getFileType(filePath: string) {
    const path = filePath.replace(/\\/g, "/");
    const type = /\/(?<type>(controllers|mixins|models|services))\//.exec(path)
      ?.groups?.type;
    if (!type) {
      throw new Error("Unhandled file type");
    }
    return type;
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
