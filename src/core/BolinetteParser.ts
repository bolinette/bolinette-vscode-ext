import { ControllerParsedData } from "parsed-data";
import { Uri } from "vscode";
import Annotation from "../models/Annotation";
import FileParserFactory from "../models/FileParserFactory";
import Project from "../models/Project";
import ProjectFile from "../models/ProjectFile";
import { ProjectFileType } from "../models/ProjectFileType";
import FilesUtil from "../utils/FilesUtil";

export default class BolinetteParser {
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
        const parser = FileParserFactory.getParser(fileType);
        const projectFile = new ProjectFile(fileType, fileUri.path, parser);
        await projectFile.updateAst();

        projectFiles.push(projectFile);
      }
    }
    const project = new Project(projectFiles);
    console.log(project);

    const controllersParsedData = project.listParsedData(
      ProjectFileType.controllers
    ) as ControllerParsedData[];

    controllersParsedData.forEach((a) => console.log(a));
  }
}
