import { ClassDef } from "ext-estree";
import Annotation from "../models/Annotation";

//////////////////////////////
// Classes
//////////////////////////////

export interface ClassElement {
  classDefAst: ClassDef;
  classDefAnnotation?: Annotation;
}

export interface ControllerClassElement extends ClassElement {
  associatedModelName?: string;
}

export interface ModelClassElement extends ClassElement {
  responses: string[];
  payloads: string[];
}

//////////////////////////////
// Parsed Data
//////////////////////////////

export interface ParsedData {
  classes: ClassElement[];
}

export interface ControllerParsedData extends ParsedData {
  classes: ControllerClassElement[];
}

export interface MixinParsedData extends ParsedData {}

export interface ModelParsedData extends ParsedData {
  classes: ModelClassElement[];
}

export interface ServiceParsedData extends ParsedData {}
