import { ReactNode } from 'react';
import { AnyObject } from '../common-types/any-object';

export type DataTypeValidators = "string" | "integer" | "boolean" | "number" | "float";

export type ValidatorFunction = (value: any, allValues?: object, meta?: object) => Promise<any> | ReactNode | undefined;

export interface ValidatorConfiguration extends AnyObject {
  type: string;
  message?: string;
  msg?: string;
  warning?: boolean;
}

export type Validator = ValidatorConfiguration | ValidatorFunction;
export interface LenghtOptions extends ValidatorConfiguration {
  '='?: string;
  is?: number;
  max?: number;
  maximum?: number;
  min?: number;
  minimum?: number;
}

export interface PatternOptions extends ValidatorConfiguration {
  pattern?: string | RegExp;
  flags?: string;
}

export interface NumericalityOptions extends ValidatorConfiguration {
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
