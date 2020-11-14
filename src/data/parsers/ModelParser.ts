import { ModelParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import { PayloadParser } from "../features/PayloadParser";
import { ResponseParser } from "../features/ResponseParser";
import Parser from "../Parser";

export default class ModelParser implements Parser {
  parse(ast: any): ModelParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "model"),
      responses: ResponseParser.parse(ast),
      payloads: PayloadParser.parse(ast),
    };
  }
}
