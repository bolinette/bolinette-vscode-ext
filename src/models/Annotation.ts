import { Argument, Decorator } from "ext-estree";

export default class Annotation {
  private ast: Decorator;

  constructor(ast: Decorator) {
    this.ast = ast;
  }

  getName() {
    return this.ast.func.id;
  }

  getParameters() {
    return [...this.ast.args, ...this.ast.keywords.map((k) => k.value)];
  }

  getFirstParameter() {
    return this.getArgumentValue(this.ast.args[0]);
  }

  getParameterByName(parameterName: string) {
    return this.ast.keywords.find((k) => k.arg === parameterName);
  }

  getArgumentValue(parameter: Argument) {
    if (!parameter) {
      return undefined;
    }
    return parameter.type === "Str" ? parameter.s : parameter.value;
  }

  toString() {
    return `@${this.getName()}(${this.getParameters()
      .map((p) => this.getArgumentValue(p))
      .join(", ")})`;
  }
}
