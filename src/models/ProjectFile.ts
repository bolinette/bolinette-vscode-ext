import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";
import AbstractParser from "./parsers/ParserInterface";

export default class ProjectFile {
  private type: string;
  private filePath: string;
  private ast: any;
  private parsedData: any;

  private fileParser: AbstractParser;

  constructor(type: string, filePath: string, fileParser: AbstractParser) {
    this.type = type;
    this.fileParser = fileParser;
    this.filePath = filePath;
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
}
