import { ServiceParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import Parser from "../Parser";

export default class ServiceParser implements Parser {
  parse(ast: any): ServiceParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "service"),
    };
  }
}
