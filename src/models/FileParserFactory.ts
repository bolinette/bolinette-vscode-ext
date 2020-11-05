import ControllerParser from "./parsers/ControllerParser";

export default abstract class FileParserFactory {
  static getParser(parserType: string) {
    switch (parserType) {
      case "controllers":
        return ControllerParser.Instance;
      case "models":
        return ControllerParser.Instance; // TODO: fix
      case "mixins":
        return ControllerParser.Instance; // TODO: fix
      case "services":
        return ControllerParser.Instance; // TODO: fix
      default:
        throw new Error("Unknown parser type");
    }
  }
}
