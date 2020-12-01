import Project from "../models/Project";
import * as vscode from "vscode";
import Completion from "../completion/Completion";
import DefaultRoutes from "../completion/DefaultRoutes";
import FileNameListByType from "../completion/FileNameListByType";
import ReturnsAndExpectsFirstArg from "../completion/ReturnsAndExpectsFirstArg";
import ReturnsSecondArg from "../completion/ReturnsSecondArg";
import ExpectsSecondArg from "../completion/ExpectsSecondArg";

export class BolinetteAutocomplete {
  private project: Project;
  private autocompleteDisposable?: vscode.Disposable;
  private completions: Completion[];

  constructor(project: Project) {
    this.project = project;
    this.completions = [
      new FileNameListByType(),
      new DefaultRoutes(),
      new ReturnsAndExpectsFirstArg(),
      new ReturnsSecondArg(),
      new ExpectsSecondArg(),
    ];
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

          for (const completion of this.completions) {
            const { applies, items } = completion.provideItems(
              linePrefix,
              document,
              position,
              this.project
            );

            if (applies) {
              return items;
            }
          }
          return undefined;
        },
      },
      ...["'", '"']
    );
  }
}
