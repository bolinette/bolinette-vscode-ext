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

          const contextRegex = /context\.(?<type>(controller|mixin|model|service))\('/.exec(
            linePrefix
          );
          if (contextRegex) {
            const type = `${contextRegex.groups?.type}s`;
            const files = this.project?.getProjectFilesByType(type);
            const parsedData = files?.map((file) =>
              file.getParsedData()
            ) as ParsedData[];
            return (
              parsedData?.map(
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
