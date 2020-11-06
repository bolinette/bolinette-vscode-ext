import ProjectFile from "./ProjectFile";

export default class Project {
  private projectFiles: ProjectFile[];

  constructor(projectFiles: ProjectFile[]) {
    this.projectFiles = projectFiles;
  }

  listParsedData(fileType: string) {
    return this.listProjectFilesByType(fileType).map((file) =>
      file.getParsedData()
    );
  }

  private listProjectFilesByType(type: string): ProjectFile[] {
    return this.projectFiles.filter((file) => file.getType() === type);
  }
}
