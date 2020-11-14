import { ModelParsedData } from "parsed-data";
import FilesUtil from "../utils/FilesUtil";
import File from "./File";
import Controller from "./files/Controller";
import Mixin from "./files/Mixin";
import Model from "./files/Model";
import Service from "./files/Service";

export default class Project {
  private controllers: Controller[];
  private mixins: Mixin[];
  private models: Model[];
  private services: Service[];

  constructor() {
    this.controllers = [];
    this.mixins = [];
    this.models = [];
    this.services = [];
  }

  addFile(filePath: string) {
    return this.addFiles([filePath])[0];
  }

  addFiles(filePaths: string[]) {
    return filePaths.map((filePath) => {
      console.log(`Adding file: ${filePath}`);
      switch (FilesUtil.getFileType(filePath)) {
        case "controllers":
          const controller = new Controller(filePath);
          this.controllers.push(controller);
          return controller.updateAst();
        case "mixins":
          const mixin = new Mixin(filePath);
          this.mixins.push(mixin);
          return mixin.updateAst();
        case "models":
          const model = new Model(filePath);
          this.models.push(model);
          return model.updateAst();
        case "services":
          const service = new Service(filePath);
          this.services.push(service);
          return service.updateAst();
        default:
          throw new Error("Unhandled file type");
      }
    });
  }

  getControllers() {
    return this.controllers;
  }

  getMixins() {
    return this.mixins;
  }

  getModels() {
    return this.models;
  }

  getServices() {
    return this.services;
  }

  updateFileAst(filePath: string, dirtyContent?: string) {
    console.log(
      `Updating file AST: ${filePath}. Dirty content: ${!!dirtyContent}`
    );
    return this.getFile(filePath)?.updateAst(dirtyContent);
  }

  private getFile(filePath: string) {
    return this.listAllFiles().find((file) => file.getPath() === filePath);
  }

  private listAllFiles(): File[] {
    return [
      ...this.controllers,
      ...this.mixins,
      ...this.models,
      ...this.services,
    ];
  }

  updateFilePath(oldPath: string, newPath: string) {
    console.log(`Updating file path: ${oldPath} ==> ${newPath}`);
    this.getFile(oldPath)?.setPath(newPath);
  }

  removeFile(filePath: string) {
    console.log(`Removing file: ${filePath}`);
    switch (FilesUtil.getFileType(filePath)) {
      case "controllers":
        this.controllers = this.controllers.filter(
          (c) => c.getPath() !== filePath
        );
        break;
      case "mixins":
        this.mixins = this.mixins.filter((m) => m.getPath() !== filePath);
        break;
      case "models":
        this.models = this.models.filter((m) => m.getPath() !== filePath);
        break;
      case "services":
        this.services = this.services.filter((s) => s.getPath() !== filePath);
        break;
    }
  }

  getController(filePath: string) {
    return this.controllers.find((c) => c.getPath() === filePath);
  }

  getModelByName(modelName: string) {
    return this.models.find(
      (model) =>
        (model.getParsedData() as ModelParsedData).classDefAnnotation?.getFirstParameter() ===
        modelName
    );
  }
}
