import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";
import FileParserFactory from "./FileParserFactory";
import AbstractParser from "./parsers/ParserInterface";

export default class ProjectFile {
  private type: string;
  private filePath: string;
  private ast: any;
  private parsedData: any;

  private fileParser: AbstractParser;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.type = FilesUtil.getFileType(this.filePath);
    this.fileParser = FileParserFactory.getParser(this.type);
  }

  async updateAst() {
    const fileContent = await FilesUtil.readFile(this.filePath);
    this.ast = await AstGenerator.parseCode(fileContent);
    this.parsedData = this.fileParser.parse(this.ast);
  }

  getType(): string {
    return this.type;
  }

  getParsedData() {
    return this.parsedData;
  }

  getPath() {
    return this.filePath;
  }

  setPath(path: string) {
    this.filePath = path;
  }

  getAst() {
    return this.ast;
  }
}
