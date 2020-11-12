import { ControllerParsedData } from "parsed-data";
import { Uri } from "vscode";
import Project from "../models/Project";
import ProjectFile from "../models/ProjectFile";
import { ProjectFileType } from "../enums/ProjectFileType";
import FilesUtil from "../utils/FilesUtil";

export default class BolinetteParser {
  private project?: Project;

  async run() {
    const projectFiles = [];
    const fileTypes = [
      ProjectFileType.controllers,
      ProjectFileType.mixins,
      ProjectFileType.models,
      ProjectFileType.services,
    ];
    for (const fileType of fileTypes) {
      const fileUris: Uri[] = await FilesUtil.listFilesInFolderRec(fileType);
      for (const fileUri of fileUris) {
        const projectFile = new ProjectFile(fileUri.path);
        await projectFile.updateAst();
        projectFiles.push(projectFile);
      }
    }
    this.project = new Project(projectFiles);
    return this;
  }

  getProject() {
    return this.project;
  }

  async addProjectFile(filePath: string) {
    console.log(`Adding file: ${filePath}`);
    const projectFile = new ProjectFile(filePath);
    await projectFile.updateAst();
    this.project?.addProjectFile(projectFile);
  }

  async updateProjectFile(filePath: string, dirtyFileContent?: string) {
    console.log(`Updating file: ${filePath}`);
    return this.project?.getProjectFile(filePath)?.updateAst(dirtyFileContent);
  }

  updateProjectFilePath(oldPath: string, newPath: string) {
    console.log(`Renaming file: ${oldPath}`);
    this.project?.updateProjectFilePath(oldPath, newPath);
  }

  removeProjectFile(filePath: string) {
    console.log(`Removing file: ${filePath}`);
    this.project?.removeProjectFile(filePath);
  }
}
