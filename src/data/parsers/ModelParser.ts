import { ModelParsedData } from "parsed-data";
import ClassDefAnnotationParser from "../features/classes/ClassDefAnnotationParser";
import ClassParser from "../features/ClassParser";
import { PayloadParser } from "../features/classes/PayloadParser";
import { ResponseParser } from "../features/classes/ResponseParser";
import Parser from "../Parser";

export default class ModelParser implements Parser {
  parse(ast: any): ModelParsedData {
    const classDefs = ClassParser.parse(ast);
    return {
      classes: classDefs.map((def) => ({
        classDefAst: def,
        classDefAnnotation: ClassDefAnnotationParser.parse(def, "model"),
        responses: ResponseParser.parse(def),
        payloads: PayloadParser.parse(def),
      })),
    };
  }
}
