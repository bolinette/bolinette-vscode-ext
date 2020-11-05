import AbstractParser from "./parsers/ParserInterface";
import ControllerParser from "./parsers/ControllerParser";
import MixinParser from "./parsers/MixinParser";
import ModelParser from "./parsers/ModelParser";
import ServiceParser from "./parsers/ServiceParser";
import { ProjectFileType } from "./ProjectFileType";

export default abstract class FileParserFactory {
  static controllerParser = new ControllerParser();
  static mixinParser = new MixinParser();
  static modelParser = new ModelParser();
  static serviceParser = new ServiceParser();

  static getParser(parserType: string) {
    switch (parserType) {
      case ProjectFileType.controllers:
        return FileParserFactory.controllerParser;
      case ProjectFileType.mixins:
        return FileParserFactory.mixinParser;
      case ProjectFileType.models:
        return FileParserFactory.modelParser;
      case ProjectFileType.services:
        return FileParserFactory.serviceParser;
      default:
        throw new Error("Unknown parser type");
    }
  }
}
