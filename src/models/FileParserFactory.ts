import AbstractParser from "./parsers/ParserInterface";
import ControllerParser from "./parsers/ControllerParser";
import MixinParser from "./parsers/MixinParser";
import ModelParser from "./parsers/ModelParser";
import ServiceParser from "./parsers/ServiceParser";

export default abstract class FileParserFactory {
  static controllerParser = new ControllerParser();
  static mixinParser = new MixinParser();
  static modelParser = new ModelParser();
  static serviceParser = new ServiceParser();

  static getParser(parserType: string) {
    switch (parserType) {
      case "controllers":
        return FileParserFactory.controllerParser;
      case "models":
        return FileParserFactory.mixinParser;
      case "mixins":
        return FileParserFactory.modelParser;
      case "services":
        return FileParserFactory.serviceParser;
      default:
        throw new Error("Unknown parser type");
    }
  }
}
