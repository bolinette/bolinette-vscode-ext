import ControllerParser from "../data/parsers/ControllerParser";
import MixinParser from "../data/parsers/MixinParser";
import ModelParser from "../data/parsers/ModelParser";
import ServiceParser from "../data/parsers/ServiceParser";

export default class ParserFactory {
  private static controllerParser = new ControllerParser();
  private static mixinParser = new MixinParser();
  private static modelParser = new ModelParser();
  private static serviceParser = new ServiceParser();

  static get(type: string) {
    switch (type) {
      case "controllers":
        return ParserFactory.controllerParser;
      case "mixins":
        return ParserFactory.mixinParser;
      case "models":
        return ParserFactory.modelParser;
      case "services":
        return ParserFactory.serviceParser;
      default:
        throw new Error("Unhandled file type");
    }
  }
}
