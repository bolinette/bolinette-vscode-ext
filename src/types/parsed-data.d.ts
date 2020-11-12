import Annotation from "../models/Annotation";

export interface ParsedData {
  classDefAnnotation?: Annotation;
}

export interface ControllerParsedData extends ParsedData {
  associatedModelName?: string;
}

export interface MixinParsedData extends ParsedData {}

export interface ModelParsedData extends ParsedData {
  responses: string[];
}

export interface ServiceParsedData extends ParsedData {}
