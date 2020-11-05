import { Uri } from "vscode";
import FileParserFactory from "../models/FileParserFactory";
import Project from "../models/Project";
import ProjectFile from "../models/ProjectFile";
import FilesUtil from "../utils/FilesUtil";

export default class BolinetteParser {
  async run() {
    const projectFiles = [];
    for (const folder of ["controllers", "mixins", "models", "services"]) {
      const fileUris: Uri[] = await FilesUtil.listFilesInFolderRec(folder);
      for (const fileUri of fileUris) {
        const parser = FileParserFactory.getParser(folder);
        const projectFile = new ProjectFile(fileUri.path, parser);
        await projectFile.updateAst();

        projectFiles.push(projectFile);
      }
    }
    const project = new Project(projectFiles);
    console.log(project);
  }
}
