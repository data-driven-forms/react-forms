import { ReactNode } from 'react';
import { AnyObject } from '../common-types/any-object';
import messages from '../validators/messages';

export type DataTypeValidators = "string" | "integer" | "boolean" | "number" | "float";

export type ValidatorFunction = (value: any, allValues?: object, meta?: object) => Promise<any> | ReactNode | { type: 'warning'; error: any } | undefined;

// Generic version with type safety - maintains backward compatibility
export type ValidatorFunction_Generic<
  TValue = any,
  TFormValues extends Record<string, any> = Record<string, any>,
  TMeta extends Record<string, any> = Record<string, any>
> = (
  value: TValue,
  allValues?: TFormValues,
  meta?: TMeta
) => Promise<any> | ReactNode | { type: 'warning'; error: any } | undefined;

export interface ValidatorConfiguration extends AnyObject {
  type: string;
  message?: string;
  msg?: string;
  warning?: boolean;
}

// Generic version with enhanced type safety
export interface ValidatorConfiguration_Generic<TValue = any> extends AnyObject {
  type: string;
  message?: string | ((value: TValue) => string);
  msg?: string | ((value: TValue) => string);
  warning?: boolean;
}

export type Validator = ValidatorConfiguration | ValidatorFunction;

// Generic version - maintains backward compatibility
export type Validator_Generic<
  TValue = any,
  TFormValues extends Record<string, any> = Record<string, any>,
  TMeta extends Record<string, any> = Record<string, any>
> = ValidatorConfiguration_Generic<TValue> | ValidatorFunction_Generic<TValue, TFormValues, TMeta>;

export interface LenghtOptions extends ValidatorConfiguration {
  '='?: string;
  is?: number;
  max?: number;
  maximum?: number;
  min?: number;
  minimum?: number;
}

// Generic version for length options
export interface LengthOptions_Generic<TValue extends { length: number } = string> extends ValidatorConfiguration_Generic<TValue> {
  '='?: string | number;
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

// Generic version for pattern options
export interface PatternOptions_Generic<TValue = string> extends ValidatorConfiguration_Generic<TValue> {
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

// Generic version for numericality options
export interface NumericalityOptions_Generic<TValue = number> extends ValidatorConfiguration_Generic<TValue> {
  even?: boolean;
  odd?: boolean;
  equalTo?: number;
  otherThan?: number;
  greaterThan?: number;
  lessThan?: number;
  greaterThanOrEqualTo?: number;
  lessThanOrEqualTo?: number;
  '='?: string | number;
  '!='?: string | number;
  '>'?: string | number;
  '<'?: string | number;
  '>='?: string | number;
  '<='?: string | number;
}

interface ValidatorsType {
  messages: typeof messages;
  urlProtocols: string[];
}

const Validators: ValidatorsType = {
  messages,
  urlProtocols: ['http', 'https'],
};

export default Validators;
