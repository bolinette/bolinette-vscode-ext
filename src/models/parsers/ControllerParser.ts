import { ControllerParsedData } from "parsed-data";
import ClassDefAnnotationParser from "./features/ClassDefAnnotationParser";
import ParserInterface from "./ParserInterface";

export default class ControllerParser implements ParserInterface {
  parse(ast: any): ControllerParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "controller"),
    };
  }
}
