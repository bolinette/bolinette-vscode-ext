import Project from "../models/Project";
import { CompletionItem, Position, TextDocument } from "vscode";

export default abstract class Completion {
  returnNoItem() {
    return {
      applies: true,
      items: [],
    };
  }

  abstract provideItems(
    linePrefix: string,
    document: TextDocument,
    position: Position,
    project: Project
  ): {
    applies: boolean;
    items?: CompletionItem[];
  };
}
