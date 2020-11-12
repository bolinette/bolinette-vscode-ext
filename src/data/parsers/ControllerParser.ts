import { ControllerParsedData } from "parsed-data";
import AssociatedModelFinder from "../features/AssociatedModelFinder";
import ClassDefAnnotationParser from "../features/ClassDefAnnotationParser";
import ParserInterface from "../ParserInterface";

export default class ControllerParser implements ParserInterface {
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
