import AbstractParser from "./AbstractParser";

export default class ControllerParser extends AbstractParser {
  private static _instance: ControllerParser;

  private constructor() {
    super();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  parse(ast: any) {
    return {};
  }
}
