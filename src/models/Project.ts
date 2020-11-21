import File from "./File";

export default class Project {
  private files: File[];

  constructor() {
    this.files = [];
  }

  addFile(file: File) {
    console.log(`Adding file: ${file.getPath()}`);
    this.files.push(file);
  }

  addFiles(files: File[]) {
    console.log(
      `Adding files: \n${files.map((file) => file.getPath()).join("\n")}`
    );
    this.files = this.files.concat(files);
  }

  getFileByType(type: string) {
    return this.files.filter((file) => file.getType() === type);
  }

  updateFileAst(filePath: string, dirtyContent?: string) {
    console.log(
      `Updating file AST: ${filePath}. Dirty content: ${!!dirtyContent}`
    );
    return this.getFileByPath(filePath)?.updateAst(dirtyContent);
  }

  private getFileByPath(filePath: string) {
    return this.files.find((file) => file.getPath() === filePath);
  }

  updateFilePath(oldPath: string, newPath: string) {
    console.log(`Updating file path: ${oldPath} ==> ${newPath}`);
    this.getFileByPath(oldPath)?.setPath(newPath);
  }

  removeFile(filePath: string) {
    console.log(`Removing file: ${filePath}`);
    this.files = this.files.filter((file) => file.getPath() !== filePath);
  }
}
