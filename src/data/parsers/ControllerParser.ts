import { ControllerParsedData } from "parsed-data";
import AssociatedModelFinder from "../features/AssociatedModelFinder";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import Parser from "../Parser";

export default class ControllerParser implements Parser {
  parse(ast: any): ControllerParsedData {
    const classDefAnnotation = ClassDefAnnotationParser.parse(
      ast,
      "controller"
    );
    return {
      classDefAnnotation,
      associatedModelName: AssociatedModelFinder.parse(classDefAnnotation),
    };
  }
}
