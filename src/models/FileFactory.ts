import FilesUtil from "../utils/FilesUtil";
import File from "./File";

export default class FileFactory {
  static create(filePath: string) {
    // If is in workspace
    // TODO: Else is virtual
    // Get file type
    const type = FilesUtil.getFileType(filePath);
    return new File(type, filePath);
  }

  static createMany(filePaths: string[]) {
    return filePaths.map((filePath) => FileFactory.create(filePath));
  }
}
