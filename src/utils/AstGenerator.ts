import { spawn } from "child_process";
import { Node } from "estree";
import ContextProvider from "./ContextProvider";

export default abstract class AstGenerator {
  static async parseCode(codeAsString: string): Promise<Node | null> {
    const pythonParserPath = ContextProvider.get().asAbsolutePath(
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
