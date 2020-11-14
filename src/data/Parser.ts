import { ParsedData } from "parsed-data";
import { Node } from "estree";

export default interface Parser {
  parse(ast: Node): ParsedData;
}
