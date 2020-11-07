import { spawn } from "child_process";
import * as vscode from "vscode";

export default abstract class AstGenerator {
  private static context: vscode.ExtensionContext;

  static init(context: vscode.ExtensionContext): void {
    this.context = context;
  }

  static async parseCode(codeAsString: string): Promise<any> {
    const pythonParserPath = AstGenerator.context.asAbsolutePath(
      "python-ast-parser.py"
    );
    const pyProg = await spawn("python", [pythonParserPath, codeAsString]);
    return new Promise((resolve, reject) => {
      pyProg.stdout.on("data", (data) => {
        const astAsString = Buffer.from(data)
          .toString("utf-8")
          .replace(/ast_type/g, "type");
        resolve(JSON.parse(astAsString));
      });
      pyProg.stderr.on("data", () => {
        resolve(null);
      });
    });
  }
}
