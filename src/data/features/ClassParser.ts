import * as esquery from "esquery";
import { ClassDef } from "ext-estree";

export default class ClassParser {
  static parse(ast: any): ClassDef[] {
    return esquery(ast, "ClassDef") as ClassDef[];
  }
}
