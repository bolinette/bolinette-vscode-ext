import { ParsedData } from "parsed-data";

export default interface Parser {
  parse(ast: any): ParsedData;
}
