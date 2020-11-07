import ProjectFile from "./ProjectFile";

export default class Project {
  private projectFiles: ProjectFile[];

  constructor(projectFiles: ProjectFile[]) {
    this.projectFiles = projectFiles;
  }

  getProjectFile(filePath: string) {
    return this.projectFiles.find((f) => f.getPath() === filePath);
  }

  addProjectFile(projectFile: ProjectFile) {
    this.projectFiles.push(projectFile);
  }

  updateProjectFilePath(oldPath: string, newPath: string) {
    this.getProjectFile(oldPath)?.setPath(newPath);
  }

  removeProjectFile(filePath: string) {
    this.projectFiles = this.projectFiles.filter(
      (file) => file.getPath() !== filePath
    );
  }

  listParsedData(fileType: string) {
    return this.getProjectFilesByType(fileType).map((file) =>
      file.getParsedData()
    );
  }

  getProjectFilesByType(type: string): ProjectFile[] {
    return this.projectFiles.filter((file) => file.getType() === type);
  }
}
