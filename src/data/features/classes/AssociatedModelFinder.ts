import Annotation from "../../../models/Annotation";

export default class AssociatedModelFinder {
  static parse(annotation: Annotation | undefined) {
    if (!annotation) {
      return undefined;
    }

    const serviceNameKeyword = annotation.getParameterByName("service_name");
    if (!serviceNameKeyword) {
      return annotation.getFirstParameter();
    }

    return annotation.getArgumentValue(serviceNameKeyword.value);
  }
}
