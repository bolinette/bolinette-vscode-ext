import { ModelParsedData } from "parsed-data";
import ModelParser from "../../data/parsers/ModelParser";
import File from "../File";

export default class Model extends File {
  private parsedData: ModelParsedData | null;

  constructor(filePath: string) {
    super(filePath, new ModelParser());
    this.parsedData = null;
  }

  parse(ast: any): void {
    if (ast) {
      this.parsedData = this.parser.parse(ast) as ModelParsedData;
    } else {
      this.parsedData = null;
    }
  }

  getParsedData(): ModelParsedData | null {
    return this.parsedData;
  }

  hasName(name: string) {
    if (!this.parsedData) {
      return false;
    }
    return this.parsedData.classes
      .map((c) => c.classDefAnnotation?.getFirstParameter())
      .includes(name);
  }
}
