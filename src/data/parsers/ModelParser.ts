import { ModelParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import { PayloadParser } from "../features/PayloadParser";
import { ResponseParser } from "../features/ResponseParser";
import ParserInterface from "../ParserInterface";

export default class ModelParser implements ParserInterface {
  parse(ast: any): ModelParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "model"),
      responses: ResponseParser.parse(ast),
      payloads: PayloadParser.parse(ast),
    };
  }
}
