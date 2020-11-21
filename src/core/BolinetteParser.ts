import FilesUtil from "../utils/FilesUtil";
import Project from "../models/Project";
import FileFactory from "../models/FileFactory";

export default class BolinetteParser {
  private project: Project;

  constructor() {
    this.project = new Project();
  }

  async run() {
    const filePaths = [
      ...(await FilesUtil.listFilesInWorkspace("controllers")),
      ...(await FilesUtil.listFilesInWorkspace("mixins")),
      ...(await FilesUtil.listFilesInWorkspace("models")),
      ...(await FilesUtil.listFilesInWorkspace("services")),
      // ...(await FilesUtil.listFilesInExtension("controllers")),
      // ...(await FilesUtil.listFilesInExtension("mixins")),
      // ...(await FilesUtil.listFilesInExtension("models")),
      // ...(await FilesUtil.listFilesInExtension("services")),
    ];

    const files = FileFactory.createMany(filePaths);
    this.project.addFiles(files);
    await Promise.all(files.map((c) => c.updateAst()));

    return this.project;
  }
}
