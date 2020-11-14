import { ControllerParsedData, ParsedData } from "parsed-data";
import ControllerParser from "../../data/parsers/ControllerParser";
import File from "../File";
import { Node } from "estree";

export default class Controller extends File {
  private parsedData: ControllerParsedData | null;

  constructor(filePath: string) {
    super(filePath, new ControllerParser());
    this.parsedData = null;
  }

  parse(ast: Node | null): void {
    if (ast) {
      this.parsedData = this.parser.parse(ast) as ControllerParsedData;
    } else {
      this.parsedData = null;
    }
  }

  getParsedData(): ControllerParsedData | null {
    return this.parsedData;
  }
}
