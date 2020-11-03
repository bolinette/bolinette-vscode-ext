import AnnotationParser from "./AnnotationsParser";

export default class BolinetteParser {
  private annotationParser: AnnotationParser;

  constructor() {
    this.annotationParser = new AnnotationParser();
  }

  async run() {
    [
      {
        folderName: "controllers",
        annotationName: "controller",
      },
      {
        folderName: "models",
        annotationName: "model",
      },
      {
        folderName: "services",
        annotationName: "service",
      },
      {
        folderName: "mixins",
        annotationName: "mixin",
      },
    ].map(async (annotation) => {
      const services = await this.annotationParser.parse(
        annotation.folderName,
        annotation.annotationName
      );
      console.log(services);
    });
  }
}
