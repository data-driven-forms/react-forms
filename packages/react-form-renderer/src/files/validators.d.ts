import { ReactNode } from 'react';

export type DataTypeValidators = "string" | "integer" | "boolean" | "number" | "float";

export type ValidatorFunction = (value: any, allValues?: object) => Promise<any> | ReactNode | undefined;

export interface Validator extends Object {
  message?: string;
  msg?: string;
}

export interface LenghtOptions extends Validator {
  '='?: string;
  is?: number;
  max?: number;
  maximum?: number;
  min?: number;
  minimum?: number;
}

export interface PatternOptions extends Validator {
  pattern?: string | RegExp;
  flags?: string;
}

export interface NumericalityOptions extends Validator {
  even?: boolean;
  odd?: boolean;
  equalTo?: number;
  otherThan?: number;
  greaterThan?: number;
  lessThan?: number;
  greaterThanOrEqualTo?: number;
  lessThanOrEqualTo?: number;
  '='?: string;
  '!='?: string;
  '>'?: string;
  '<'?: string;
  '>='?: string;
  '<='?: string;
}
