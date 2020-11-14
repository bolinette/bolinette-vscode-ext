import { MixinParsedData } from "parsed-data";
import MixinParser from "../../data/parsers/MixinParser";
import File from "../File";

export default class Mixin extends File {
  private parsedData: MixinParsedData | null;

  constructor(filePath: string) {
    super(filePath, new MixinParser());
    this.parsedData = null;
  }

  parse(ast: any): void {
    if (ast) {
      this.parsedData = this.parser.parse(ast) as MixinParsedData;
    } else {
      this.parsedData = null;
    }
  }

  getParsedData(): MixinParsedData | null {
    return this.parsedData;
  }
}