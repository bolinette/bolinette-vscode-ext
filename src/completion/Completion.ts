import Project from "../models/Project";
import { CompletionItem, Position, TextDocument } from "vscode";

export default interface Completion {
  provideItems(
    linePrefix: string,
    document: TextDocument,
    position: Position,
    project: Project
  ): {
    applies: boolean;
    items?: CompletionItem[];
  };
}
