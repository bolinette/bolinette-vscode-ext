import Project from "../models/Project";
import * as vscode from "vscode";
import { ModelParsedData, ParsedData } from "parsed-data";
import File from "../models/File";

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
            let files: File[] = [];
            switch (type) {
              case "controllers":
                files = this.project.getControllers();
                break;
              case "mixins":
                files = this.project.getMixins();
                break;
              case "models":
                files = this.project.getModels();
                break;
              case "services":
                files = this.project.getServices();
                break;
            }
            const parsedData = files.map((file) =>
              file.getParsedData()
            ) as ParsedData[];
            return (
              parsedData
                .map((el) => el.classes)
                .flat()
                .map(
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
            const currentFile = this.project.getController(document.uri.path);
            if (!currentFile) {
              return [];
            }
            const parsedData = currentFile.getParsedData();
            if (!parsedData) {
              return [];
            }
            const matchingClass = parsedData.classes.find(
              (c) =>
                c.classDefAst.lineno <= position.line + 1 &&
                c.classDefAst.end_lineno + 1 >= position.line + 1
            );
            if (!matchingClass) {
              return [];
            }
            const modelName = matchingClass.associatedModelName;
            if (!modelName) {
              return [];
            }
            const model = this.project
              .getModels()
              .find((model) => model.hasName(modelName));
            if (!model) {
              return [];
            }
            const modelParsedData = model
              .getParsedData()
              ?.classes.find(
                (c) => c.classDefAnnotation?.getFirstParameter() === modelName
              );
            if (!modelParsedData) {
              return [];
            }
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
            const models = this.project.getModels();
            const parsedData = models
              .map((model) => model.getParsedData())
              .filter((model) => !!model) as ModelParsedData[];
            return parsedData
              .map((el) => el.classes)
              .flat()
              .map(
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

            const parsedData = this.project
              .getModels()
              .map((model) => model.getParsedData())
              .filter((model) => !!model) as ModelParsedData[];
            const matchingClass = parsedData
              .map((data) => data.classes)
              .flat()
              .find(
                (c) => c.classDefAnnotation?.getFirstParameter() === modelName
              );

            if (!matchingClass) {
              return [];
            }
            return matchingClass.responses.map(
              (response) =>
                new vscode.CompletionItem(
                  response,
                  vscode.CompletionItemKind.Field
                )
            );
          }

          const expectArg2Regex = /expects=\('(?<modelName>[^']+)', ?'$/;
          const expectArg2RegexResult = expectArg2Regex.exec(linePrefix);
          if (expectArg2RegexResult) {
            const modelName = expectArg2RegexResult.groups?.modelName;
            if (!modelName) {
              return [];
            }

            const parsedData = this.project
              .getModels()
              .map((model) => model.getParsedData())
              .filter((model) => !!model) as ModelParsedData[];
            const matchingClass = parsedData
              .map((data) => data.classes)
              .flat()
              .find(
                (c) => c.classDefAnnotation?.getFirstParameter() === modelName
              );

            if (!matchingClass) {
              return [];
            }
            return matchingClass.payloads.map(
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
