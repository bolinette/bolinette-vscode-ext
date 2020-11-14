import { ClassDef, Decorator } from "ext-estree";
import * as esquery from "esquery";
import Annotation from "../../../models/Annotation";

export default class ClassDefAnnotationParser {
  static parse(ast: any, annotation: string): Annotation | undefined {
    const astClassDefs = esquery(ast, "ClassDef") as ClassDef[];
    const astDecorator = astClassDefs
      .map((classDef) => classDef.decorator_list)
      .flat()
      .find((decorator: Decorator) => decorator.func?.id === annotation);

    astClassDefs;

    if (!astDecorator) {
      return undefined;
    }

    return new Annotation(astDecorator);
  }
}
