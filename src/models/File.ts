import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";
import Parser from "../data/Parser";
import { ParsedData } from "parsed-data";
import { Node } from "estree";
import ParserFactory from "./ParserFactory";

export default class File {
  private type: string;
  private parser: Parser;
  private filePath: string
  private ast: Node | null = null;
  private fileContent: string | undefined;
  private virtual: boolean = false;
  private parsedData: ParsedData | null;

  constructor(type: string, filePath: string, fileContent?: string) {
    this.type = type;
    this.parser = ParserFactory.get(this.type);
    this.filePath = filePath;
    this.ast = null;
    this.parsedData = null;
    this.fileContent = fileContent;
    this.virtual = !!fileContent;
  }

  getType() {
    return this.type;
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
      if (this.virtual) {
        fileContent = this.fileContent || "";
      } else {
        fileContent = await FilesUtil.readFile(this.filePath);
      }
    } else {
      fileContent = dirtyContent;
    }
    this.ast = await AstGenerator.parseCode(fileContent);
    this.parse(this.ast);
  }

  parse(ast: Node | null) {
    if (ast) {
      this.parsedData = this.parser.parse(ast);
    } else {
      this.parsedData = null;
    }
  }

  getParsedData() {
    return this.parsedData;
  }
}
