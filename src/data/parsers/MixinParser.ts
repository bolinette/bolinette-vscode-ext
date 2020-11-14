import { MixinParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/classes/ClassDefAnnotationParser";
import ClassParser from "../features/ClassParser";
import Parser from "../Parser";
import { Node } from "estree";

export default class MixinParser implements Parser {
  parse(ast: Node): MixinParsedData {
    const classDefs = ClassParser.parse(ast);
    return {
      classes: classDefs.map((def) => ({
        classDefAst: def,
        classDefAnnotation: ClassDefAnnotationParser.parse(def, "mixin"),
      })),
    };
  }
}
