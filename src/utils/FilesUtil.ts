import * as vscode from "vscode";
import * as glob from "glob";
import * as path from "path";
import ContextProvider from "./ContextProvider";

export default abstract class FilesUtil {
  static async readFile(path: string): Promise<string> {
    const fileContentBuffer = await vscode.workspace.fs.readFile(
      vscode.Uri.parse(path)
    );
    return Buffer.from(fileContentBuffer).toString("utf-8");
  }

  static async listFilesInWorkspace(folder: string) {
    const files = await vscode.workspace.findFiles(`${folder}/**/*.py`);
    return files.map((file) => file.path);
  }

  static listFilesInExtension(folder: string): Promise<string[]> {
    const context = ContextProvider.get();
    return new Promise((resolve, reject) => {
      glob(
        path.join(context.extensionPath, `defaults/${folder}/**/*.py`),
        (err, filePaths) => {
          if (err) {
            reject(err);
          }
          resolve(filePaths);
        }
      );
    });
  }

  static isSubdirectory(parent: string, child: string) {
    return path.relative(parent, child);
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
