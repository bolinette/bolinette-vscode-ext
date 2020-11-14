import { ClassDef, Decorator } from "ext-estree";
import * as esquery from "esquery";
import Annotation from "../../../models/Annotation";

export default class ClassDefAnnotationParser {
  static parse(node: ClassDef, annotation: string): Annotation | undefined {
    const astDecorator = node.decorator_list.find(
      (decorator: Decorator) => decorator.func?.id === annotation
    );

    if (!astDecorator) {
      return undefined;
    }

    return new Annotation(astDecorator);
  }
}
