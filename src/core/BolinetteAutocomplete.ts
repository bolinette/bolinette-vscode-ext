import Project from "../models/Project";
import * as vscode from "vscode";
import {
  ControllerParsedData,
  MixinParsedData,
  ModelParsedData,
  ParsedData,
  ServiceParsedData,
} from "parsed-data";
import { parse } from "path";

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

          if (!this.project) {
            return [];
          }

          const contextRegex = /context\.(?<type>(controller|mixin|model|service))\('$/.exec(
            linePrefix
          );
          if (contextRegex) {
            const type = `${contextRegex.groups?.type}s`;
            const files = this.project.getProjectFilesByType(type);
            const parsedData = files.map((file) =>
              file.getParsedData()
            ) as ParsedData[];
            return (
              parsedData.map(
                (el) =>
                  new vscode.CompletionItem(
                    el.classDefAnnotation?.getFirstParameter() || "",
                    vscode.CompletionItemKind.Field
                  )
              ) || []
            );
          }

          const routeRegex = /self\.defaults\.(get_all|get_one|create|update|patch|delete)\('$/;
          if (routeRegex.test(linePrefix)) {
            const currentFile = this.project.getProjectFile(document.uri.path);
            if (!currentFile || currentFile.getType() !== "controllers") {
              return [];
            }
            const parsedData = currentFile.getParsedData() as ControllerParsedData;
            const modelName = parsedData.associatedModelName;
            if (!modelName) {
              return [];
            }
            const model = this.project.findModelByName(modelName);
            if (!model) {
              return [];
            }
            const modelParsedData = model.getParsedData() as ModelParsedData;
            return modelParsedData.responses.map(
              (response) =>
                new vscode.CompletionItem(
                  response,
                  vscode.CompletionItemKind.Field
                )
            );
          }

          const returnOrExpectArg1Regex = /(returns|expects)=\('$/;
          if (returnOrExpectArg1Regex.test(linePrefix)) {
            const models = this.project.getProjectFilesByType("models");
            const parsedData = models.map((model) =>
              model.getParsedData()
            ) as ModelParsedData[];
            return parsedData.map(
              (el) =>
                new vscode.CompletionItem(
                  el.classDefAnnotation?.getFirstParameter() || "",
                  vscode.CompletionItemKind.Field
                )
            );
          }

          const returnArg2Regex = /returns=\('(?<modelName>[^']+)', ?'$/;
          const returnArg2RegexResult = returnArg2Regex.exec(linePrefix);
          if (returnArg2RegexResult) {
            const modelName = returnArg2RegexResult.groups?.modelName;
            if (!modelName) {
              return [];
            }
            const model = this.project.findModelByName(modelName);
            if (!model) {
              return [];
            }
            const parsedData = model.getParsedData() as ModelParsedData;
            return parsedData.responses.map(
              (response) =>
                new vscode.CompletionItem(
                  response,
                  vscode.CompletionItemKind.Field
                )
            );
          }

          return [];
        },
      }
    );
  }
}
