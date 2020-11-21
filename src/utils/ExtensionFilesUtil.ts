import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";

export type VirtualFile = {
  filePath: string;
  fileContent: string;
};

export default class ExtensionFilesUtil {
  private static readFile(filePath: string): Promise<VirtualFile> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, null, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve({
          filePath,
          fileContent: Buffer.from(data).toString("utf-8"),
        });
      });
    });
  }
}
