import { ClassDef, Decorator } from "ext-estree";
import * as esquery from "esquery";
import Annotation from "../../Annotation";

export default class ClassDefAnnotationParser {
  static parse(ast: any, annotation: string): Annotation | null {
    const astClassDefs = esquery(ast, "ClassDef") as ClassDef[];
    const astDecorator = astClassDefs
      .map((classDef) => classDef.decorator_list)
      .flat()
      .find((decorator: Decorator) => decorator.func?.id === annotation);

    if (!astDecorator) {
      return null;
    }

    return new Annotation(astDecorator);
  }
}
