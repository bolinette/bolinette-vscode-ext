import { spawn } from "child_process";
import { Node } from "estree";
import ContextProvider from "./ContextProvider";
import * as vscode from "vscode";

export default abstract class AstGenerator {
  static async parseCode(codeAsString: string): Promise<Node | null> {
    const pythonParserPath = ContextProvider.get().asAbsolutePath(
      "python-ast-parser.py"
    );
    const pythonCmd = vscode.workspace
      .getConfiguration()
      .get("bolinette.pythonCmd") as string;
    const pyProg = await spawn(pythonCmd, [pythonParserPath, codeAsString]);
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
      pyProg.on("error", () => {
        reject("Invalid path to Python executor.");
      });
    });
  }
}
