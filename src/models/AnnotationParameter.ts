export default class AnnotationParameter {
  private type: string;
  private key: string;
  private value: string | null;

  constructor(type: string, key: string, value: string | null) {
    this.type = type;
    this.key = key;
    this.value = value;
  }
}
