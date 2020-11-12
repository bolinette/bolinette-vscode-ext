import ControllerParser from "../data/parsers/ControllerParser";
import MixinParser from "../data/parsers/MixinParser";
import ModelParser from "../data/parsers/ModelParser";
import ServiceParser from "../data/parsers/ServiceParser";
import { ProjectFileType } from "../enums/ProjectFileType";

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
