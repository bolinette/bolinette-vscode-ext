import Project from "../models/Project";
import {
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
} from "vscode";
import Completion from "./Completion";
import File from "../models/File";
import { ParsedData } from "parsed-data";

export default class FileNameListByType extends Completion {
  provideItems(
    linePrefix: string,
    document: TextDocument,
    position: Position,
    project: Project
  ): {
    applies: boolean;
    items?: CompletionItem[];
  } {
    const contextRegex = /context\.(?<type>(controller|mixin|model|service))\(('|")$/.exec(
      linePrefix
    );
    if (!contextRegex) {
      return {
        applies: false,
      };
    }

    const type = `${contextRegex.groups?.type}s`;
    let files = project.getFileByType(type);

    const parsedData = files
      .map((file) => file.getParsedData())
      .filter((x) => !!x) as ParsedData[];

    const items = parsedData
      .map((el) => el.classes)
      .flat()
      .map(
        (el) =>
          new CompletionItem(
            el.classDefAnnotation?.getFirstParameter() || "",
            CompletionItemKind.Field
          )
      );

    return {
      applies: true,
      items,
    };
  }
}
