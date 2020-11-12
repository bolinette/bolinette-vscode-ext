import * as esquery from "esquery";
import { Tuple } from "ext-estree";

export class ResponseParser {
  static parse(ast: any): string[] {
    const tuples = esquery(ast, "FunctionDef[name=\"responses\"] Yield Tuple") as Tuple[];
    return tuples.map(tuple => tuple.elts[0].s).filter(x => !!x) as string[];
  }
}
