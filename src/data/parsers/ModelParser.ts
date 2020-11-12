import { ModelParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import { ResponseParser } from "../features/ResponseParser";
import ParserInterface from "../ParserInterface";

export default class ModelParser implements ParserInterface {
  parse(ast: any): ModelParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "model"),
      responses: ResponseParser.parse(ast),
    };
  }
}
