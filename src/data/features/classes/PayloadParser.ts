import * as esquery from "esquery";
import { ClassDef, Tuple } from "ext-estree";

export class PayloadParser {
  static parse(node: ClassDef): string[] {
    const tuples = esquery(
      node,
      'FunctionDef[name="payloads"] Yield Tuple'
    ) as Tuple[];
    return tuples
      .map((tuple) => tuple.elts[0].s || tuple.elts[0].value)
      .filter((x) => !!x) as string[];
  }
}
