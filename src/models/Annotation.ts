export default class Annotation {
  private ast: any;

  constructor(ast: any) {
    this.ast = ast;
  }

  getParameters() {
    return [...this.ast.args, ...this.ast.keywords];
  }
}
