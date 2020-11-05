export default class Annotation {
  private ast: any;

  constructor(ast: any) {
    this.ast = ast;
  }

  getParameters() {
    return [...this.ast.args, ...this.ast.keywords];
  }

  getAnnotationName(): string {
    return this.ast.func?.id || "";
  }

  getFirstParameter() {
    return this.getParameterValue(this.ast.args?.[0]);
  }

  private getParameterValue(parameter: any) {
    if (!parameter) {
      return null;
    }
    return parameter.type === "Str" ? parameter.s : parameter.value?.value;
  }
}
