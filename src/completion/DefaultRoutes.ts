import Project from "../models/Project";
import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import Completion from "./Completion";

export default class DefaultRoutes implements Completion {
  provideItems(
    linePrefix: string,
    document: TextDocument,
    position: Position,
    project: Project
  ): {
    applies: boolean;
    items?: CompletionItem[];
  } {
    const routeRegex = /self\.defaults\.(get_all|get_one|create|update|patch|delete)\('$/;
    if (!routeRegex.test(linePrefix)) {
      return { applies: false };
    }
    const currentFile = project.getController(document.uri.path);
    if (!currentFile) {
      return { applies: true, items: [] };
    }
    const parsedData = currentFile.getParsedData();
    if (!parsedData) {
      return { applies: true, items: [] };
    }
    const matchingClass = parsedData.classes.find(
      (c) =>
        c.classDefAst.lineno <= position.line + 1 &&
        (!c.classDefAst.end_lineno ||
          c.classDefAst.end_lineno + 1 >= position.line + 1)
    );
    if (!matchingClass) {
      return { applies: true, items: [] };
    }
    const modelName = matchingClass.associatedModelName;
    if (!modelName) {
      return { applies: true, items: [] };
    }
    const model = project.getModels().find((model) => model.hasName(modelName));
    if (!model) {
      return { applies: true, items: [] };
    }
    const modelParsedData = model
      .getParsedData()
      ?.classes.find(
        (c) => c.classDefAnnotation?.getFirstParameter() === modelName
      );
    if (!modelParsedData) {
      return { applies: true, items: [] };
    }
    return {
      applies: true,
      items: modelParsedData.responses.map(
        (response) => new CompletionItem(response, CompletionItemKind.Field)
      ),
    };
  }
}
