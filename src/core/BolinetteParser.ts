import Project from "../models/Project";
import { ProjectFileType } from "../enums/ProjectFileType";
import FilesUtil from "../utils/FilesUtil";

export default class BolinetteParser {
  private project: Project;

  constructor() {
    this.project = new Project();
  }

  async run() {
    const promises = this.project.addFiles([
      ...(await this.listFiles("controllers")).map((f) => f.path),
      ...(await this.listFiles("mixins")).map((f) => f.path),
      ...(await this.listFiles("models")).map((f) => f.path),
      ...(await this.listFiles("services")).map((f) => f.path),
    ]);
    await Promise.all(promises);
    return this.project;
  }

  private listFiles(fileType: string) {
    return FilesUtil.listFilesInFolderRec(fileType);
  }
}
