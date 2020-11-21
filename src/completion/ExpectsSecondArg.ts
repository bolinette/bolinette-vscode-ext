import Project from "../models/Project";
import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import Completion from "./Completion";
import { ModelParsedData } from "parsed-data";

export default class ExpectsSecondArg extends Completion {
  provideItems(
    linePrefix: string,
    document: TextDocument,
    position: Position,
    project: Project
  ): {
    applies: boolean;
    items?: CompletionItem[];
  } {
    const expectArg2Regex = /web\.Expects\('(?<modelName>[^']+)', ?'$/;
    const expectArg2RegexResult = expectArg2Regex.exec(linePrefix);
    if (!expectArg2RegexResult) {
      return { applies: false };
    }
    const modelName = expectArg2RegexResult.groups?.modelName;
    if (!modelName) {
      return this.returnNoItem();
    }

    const parsedData = project
      .getFileByType("models")
      .map((model) => model.getParsedData())
      .filter((model) => !!model) as ModelParsedData[];
    const matchingClass = parsedData
      .map((data) => data.classes)
      .flat()
      .find((c) => c.classDefAnnotation?.getFirstParameter() === modelName);

    if (!matchingClass) {
      return this.returnNoItem();
    }
    return {
      applies: true,
      items: matchingClass.payloads.map(
        (response) => new CompletionItem(response, CompletionItemKind.Field)
      ),
    };
  }
}
