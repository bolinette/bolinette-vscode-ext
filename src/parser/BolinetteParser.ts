import AnnotationParser from "./AnnotationsParser";

export default class BolinetteParser {
  private annotationParser: AnnotationParser;

  constructor() {
    this.annotationParser = new AnnotationParser();
  }

  async run() {
    const services: string[] = await this.annotationParser.parseServices();
    console.log(`Services: ${services.join(", ")}`);
  }
}
