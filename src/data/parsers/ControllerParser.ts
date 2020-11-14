import { ControllerParsedData } from "parsed-data";
import AssociatedModelFinder from "../features/classes/AssociatedModelFinder";
import ClassDefAnnotationParser from "../features/classes/ClassDefAnnotationParser";
import ClassParser from "../features/ClassParser";
import Parser from "../Parser";

export default class ControllerParser implements Parser {
  parse(ast: any): ControllerParsedData {
    const classDefs = ClassParser.parse(ast);
    return {
      classes: classDefs.map((def) => {
        const annotation = ClassDefAnnotationParser.parse(def, "controller");
        return {
          classDefAst: def,
          classDefAnnotation: annotation,
          associatedModelName: AssociatedModelFinder.parse(annotation),
        };
      }),
    };
  }
}
