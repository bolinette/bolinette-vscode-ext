import { timeStamp } from "console";
import Annotation from "../models/Annotation";
import AnnotationParser from "./AnnotationsParser";

export default class BolinetteParser {
  private annotationParser: AnnotationParser;
  private annotations: Annotation[];

  constructor() {
    this.annotationParser = new AnnotationParser();
    this.annotations = [];
  }

  async run() {
    const annotationPromises = [
      {
        folder: "controllers",
        annotation: "controller",
      },
      {
        folder: "models",
        annotation: "model",
      },
      {
        folder: "services",
        annotation: "service",
      },
      {
        folder: "mixins",
        annotation: "mixin",
      },
    ].map(async ({ folder, annotation }) => {
      const annotations = await this.annotationParser.parse(folder, annotation);
      return { folder, annotations };
    });

    const annotations = await Promise.all(annotationPromises);
    console.log(annotations);
  }
}
