import { ServiceParsedData } from "parsed-data";
import ServiceParser from "../../data/parsers/ServiceParser";
import File from "../File";

export default class Service extends File {
  private parsedData: ServiceParsedData | null;

  constructor(filePath: string) {
    super(filePath, new ServiceParser());
    this.parsedData = null;
  }

  parse(ast: any): void {
    if (ast) {
      this.parsedData = this.parser.parse(ast) as ServiceParsedData;
    } else {
      this.parsedData = null;
    }
  }

  getParsedData(): ServiceParsedData | null {
    return this.parsedData;
  }
}
