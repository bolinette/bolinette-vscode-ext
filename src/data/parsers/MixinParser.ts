import { MixinParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import Parser from "../Parser";

export default class MixinParser implements Parser {
  parse(ast: any): MixinParsedData {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "mixin"),
    };
  }
}
