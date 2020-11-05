import * as esquery from "esquery";
import Annotation from "../models/Annotation";

export default class AnnotationParser {
  parse(ast: any, annotation: string): Annotation | null {
    const astClassDefs: any[] = esquery(ast, "ClassDef");
    const astDecorator: any = astClassDefs
      .map((classDef) => classDef.decorator_list)
      .flat()
      .find((decorator: any) => decorator.func?.id === annotation);

    if (!astDecorator) {
      return null;
    }
    return new Annotation(astDecorator);
  }
}
