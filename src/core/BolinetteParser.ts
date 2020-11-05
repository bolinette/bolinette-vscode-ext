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
    const folders = [
      ProjectFileType.controllers,
      ProjectFileType.mixins,
      ProjectFileType.models,
      ProjectFileType.services,
    ];
    for (const folder of folders) {
      const fileUris: Uri[] = await FilesUtil.listFilesInFolderRec(folder);
      for (const fileUri of fileUris) {
        const parser = FileParserFactory.getParser(folder);
        const projectFile = new ProjectFile(folder, fileUri.path, parser);
        await projectFile.updateAst();

        projectFiles.push(projectFile);
      }
    }
    const project = new Project(projectFiles);
    console.log(project);

    const controllersClassDefsAnnotation = project.listClassDefAnnotations(
      ProjectFileType.controllers
    ) as Annotation[];
    console.log(
      controllersClassDefsAnnotation.map(
        (annotation) =>
          `@${annotation.getAnnotationName()}(${annotation.getFirstParameter()})`
      )
    );
  }
}
