import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";
import Parser from "../data/Parser";
import { ParsedData } from "parsed-data";
import { Node } from "estree";

export default abstract class File {
  protected filePath: string;
  protected parser: Parser;
  protected ast: Node | null;

  constructor(filePath: string, parser: Parser) {
    this.filePath = filePath;
    this.parser = parser;
    this.ast = null;
  }

  getPath() {
    return this.filePath;
  }

  setPath(path: string) {
    this.filePath = path;
  }

  async updateAst(dirtyContent?: string) {
    let fileContent;
    if (!dirtyContent) {
      fileContent = await FilesUtil.readFile(this.filePath);
    } else {
      fileContent = dirtyContent;
    }
    this.ast = await AstGenerator.parseCode(fileContent);
    this.parse(this.ast);
  }

  abstract parse(ast: Node | null): void;

  abstract getParsedData(): ParsedData | null;
}
