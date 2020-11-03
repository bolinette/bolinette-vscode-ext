import AnnotationParameter from "./AnnotationParameter";

export default class Annotation {
  private name: string;
  private annotationParameters: AnnotationParameter[];

  constructor(name: string, annotationParameters: AnnotationParameter[]) {
    this.name = name;
    this.annotationParameters = annotationParameters;
  }
}
