import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";
import FileParserFactory from "../utils/FileParserFactory";
import AbstractParser from "../data/ParserInterface";

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

  async updateAst(dirtyContent?: string) {
    let fileContent;
    if (!dirtyContent) {
      fileContent = await FilesUtil.readFile(this.filePath);
    } else {
      fileContent = dirtyContent;
    }
    this.ast = await AstGenerator.parseCode(fileContent);
    if (this.ast) {
      this.parsedData = this.fileParser.parse(this.ast);
    } else {
      this.parsedData = null;
    }
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
