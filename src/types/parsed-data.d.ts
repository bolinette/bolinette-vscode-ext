import Annotation from "../models/Annotation";

export interface ParsedData {
  classDefAnnotation?: Annotation;
}

export interface ControllerParsedData extends ParsedData {}

export interface MixinParsedData extends ParsedData {}

export interface ModelParsedData extends ParsedData {}

export interface ServiceParsedData extends ParsedData {}
