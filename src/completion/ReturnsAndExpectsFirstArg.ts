import Project from "../models/Project";
import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import Completion from "./Completion";
import File from "../models/File";
import { ModelParsedData, ParsedData } from "parsed-data";

export default class ReturnsAndExpectsFirstArg extends Completion {
  provideItems(
    linePrefix: string,
    document: TextDocument,
    position: Position,
    project: Project
  ): {
    applies: boolean;
    items?: CompletionItem[];
  } {
    const returnOrExpectArg1Regex = /web\.(Returns|Expects)\('$/;
    if (!returnOrExpectArg1Regex.test(linePrefix)) {
      return { applies: false };
    }
    const models = project.getModels();
    const parsedData = models
      .map((model) => model.getParsedData())
      .filter((model) => !!model) as ModelParsedData[];
    return {
      applies: true,
      items: parsedData
        .map((el) => el.classes)
        .flat()
        .map(
          (el) =>
            new CompletionItem(
              el.classDefAnnotation?.getFirstParameter() || "",
              CompletionItemKind.Field
            )
        ),
    };
  }
}
