import Project from "../models/Project";
import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import Completion from "./Completion";
import { ControllerParsedData, ModelParsedData } from "parsed-data";

export default class DefaultRoutes extends Completion {
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
    const currentFile = project
      .getFileByType("controllers")
      .find((c) => c.getPath() === document.uri.path);
    if (!currentFile) {
      return this.returnNoItem();
    }
    const parsedData = currentFile.getParsedData() as ControllerParsedData;
    if (!parsedData) {
      return this.returnNoItem();
    }
    const matchingClass = parsedData.classes.find(
      (c) =>
        c.classDefAst.lineno <= position.line + 1 &&
        (!c.classDefAst.end_lineno ||
          c.classDefAst.end_lineno + 1 >= position.line + 1)
    );
    if (!matchingClass) {
      return this.returnNoItem();
    }
    const modelName = matchingClass.associatedModelName;
    if (!modelName) {
      return this.returnNoItem();
    }
    const model = project.getFileByType("models").find((model) =>
      model
        .getParsedData()
        ?.classes.map((c) => c.classDefAnnotation?.getFirstParameter())
        .includes(modelName)
    );
    if (!model) {
      return this.returnNoItem();
    }
    const modelParsedData = model.getParsedData() as ModelParsedData;
    if (!modelParsedData) {
      return this.returnNoItem();
    }

    const matchingData = modelParsedData.classes.find(
      (c) => c.classDefAnnotation?.getFirstParameter() === modelName
    );
    if (!matchingData) {
      return this.returnNoItem();
    }
    return {
      applies: true,
      items: matchingData.responses.map(
        (response) => new CompletionItem(response, CompletionItemKind.Field)
      ),
    };
  }
}
