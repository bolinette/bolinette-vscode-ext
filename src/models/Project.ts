import ProjectFile from "./ProjectFile";

export default class Project {
  private projectFiles: ProjectFile[];

  constructor(projectFiles: ProjectFile[]) {
    this.projectFiles = projectFiles;
  }
}
