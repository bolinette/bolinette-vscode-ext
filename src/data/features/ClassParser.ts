import * as esquery from "esquery";
import { ClassDef } from "ext-estree";
import { Node } from "estree";

export default class ClassParser {
  static parse(ast: Node): ClassDef[] {
    return esquery(ast, "ClassDef") as ClassDef[];
  }
}
