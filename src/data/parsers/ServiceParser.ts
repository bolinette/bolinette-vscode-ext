import { ServiceParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import ParserInterface from "../ParserInterface";

export default class ServiceParser implements ParserInterface {
  parse(ast: any): ServiceParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "service"),
    };
  }
}
