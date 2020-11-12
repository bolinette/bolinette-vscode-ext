import { MixinParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import ParserInterface from "../ParserInterface";

export default class MixinParser implements ParserInterface {
  parse(ast: any): MixinParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "mixin"),
    };
  }
}
