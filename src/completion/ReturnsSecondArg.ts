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

export default class ReturnsSecondArg implements Completion {
  provideItems(
    linePrefix: string,
    document: TextDocument,
    position: Position,
    project: Project
  ): {
    applies: boolean;
    items?: CompletionItem[];
  } {
    const returnArg2Regex = /returns=\('(?<modelName>[^']+)', ?'$/;
    const returnArg2RegexResult = returnArg2Regex.exec(linePrefix);
    if (!returnArg2RegexResult) {
      return { applies: false };
    }
    const modelName = returnArg2RegexResult.groups?.modelName;
    if (!modelName) {
      return { applies: true, items: [] };
    }

    const parsedData = project
      .getModels()
      .map((model) => model.getParsedData())
      .filter((model) => !!model) as ModelParsedData[];
    const matchingClass = parsedData
      .map((data) => data.classes)
      .flat()
      .find((c) => c.classDefAnnotation?.getFirstParameter() === modelName);

    if (!matchingClass) {
      return { applies: true, items: [] };
    }
    return {
      applies: true,
      items: matchingClass.responses.map(
        (response) => new CompletionItem(response, CompletionItemKind.Field)
      ),
    };
  }
}
