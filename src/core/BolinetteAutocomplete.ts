import Project from "../models/Project";
import * as vscode from "vscode";
import {
  ControllerParsedData,
  MixinParsedData,
  ModelParsedData,
  ServiceParsedData,
} from "parsed-data";

export class BolinetteAutocomplete {
  private project?: Project;
  private autocompleteDisposable?: vscode.Disposable;

  constructor(project?: Project) {
    this.project = project;
  }

  registerAutocomplete() {
    this.autocompleteDisposable?.dispose();
    this.autocompleteDisposable = vscode.languages.registerCompletionItemProvider(
      "python",
      {
        provideCompletionItems: (document, position) => {
          const linePrefix = document
            .lineAt(position)
            .text.substr(0, position.character);

          switch (linePrefix) {
            case "context.controller('":
              const controllers = this.project?.getProjectFilesByType(
                "controllers"
              );
              const controllerParsedData = controllers?.map((controller) =>
                controller.getParsedData()
              ) as ControllerParsedData[];
              return (
                controllerParsedData?.map(
                  (el) =>
                    new vscode.CompletionItem(
                      el.classDefAnnotation?.getFirstParameter() || "",
                      vscode.CompletionItemKind.Field
                    )
                ) || []
              );
            case "context.mixin('":
              const mixins = this.project?.getProjectFilesByType("mixins");
              const mixinParsedData = mixins?.map((service) =>
                service.getParsedData()
              ) as MixinParsedData[];
              return (
                mixinParsedData?.map(
                  (el) =>
                    new vscode.CompletionItem(
                      el.classDefAnnotation?.getFirstParameter() || "",
                      vscode.CompletionItemKind.Field
                    )
                ) || []
              );
            case "context.model('":
              const models = this.project?.getProjectFilesByType("models");
              const modelParsedData = models?.map((service) =>
                service.getParsedData()
              ) as ModelParsedData[];
              return (
                modelParsedData?.map(
                  (el) =>
                    new vscode.CompletionItem(
                      el.classDefAnnotation?.getFirstParameter() || "",
                      vscode.CompletionItemKind.Field
                    )
                ) || []
              );
            case "context.service('":
              const services = this.project?.getProjectFilesByType("services");
              const serviceParsedData = services?.map((service) =>
                service.getParsedData()
              ) as ServiceParsedData[];
              return (
                serviceParsedData?.map(
                  (el) =>
                    new vscode.CompletionItem(
                      el.classDefAnnotation?.getFirstParameter() || "",
                      vscode.CompletionItemKind.Field
                    )
                ) || []
              );
          }
          return [];
        },
      }
    );
  }
}
