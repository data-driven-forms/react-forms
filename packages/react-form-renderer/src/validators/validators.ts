import { ReactNode } from 'react';
import { AnyObject } from '../common-types/any-object';
import messages from '../validators/messages';

export type DataTypeValidators = 'string' | 'integer' | 'boolean' | 'number' | 'float';

export type ValidatorFunction<
  TValue = any,
  TFormValues extends Record<string, any> = Record<string, any>,
  TMeta extends Record<string, any> = Record<string, any>
> = (value: TValue, allValues?: TFormValues, meta?: TMeta) => Promise<any> | ReactNode | { type: 'warning'; error: any } | undefined;

export interface ValidatorConfiguration<TValue = any> extends AnyObject {
  type: string;
  message?: string | ((value: TValue) => string);
  msg?: string | ((value: TValue) => string);
  warning?: boolean;
}

export type Validator<
  TValue = any,
  TFormValues extends Record<string, any> = Record<string, any>,
  TMeta extends Record<string, any> = Record<string, any>
> = ValidatorConfiguration<TValue> | ValidatorFunction<TValue, TFormValues, TMeta>;

export interface LengthOptions<TValue extends { length: number } = string> extends ValidatorConfiguration<TValue> {
  '='?: string | number;
  is?: number;
  max?: number;
  maximum?: number;
  min?: number;
  minimum?: number;
}

// Keep typo for backward compatibility
export interface LenghtOptions extends LengthOptions {}

export interface PatternOptions<TValue = string> extends ValidatorConfiguration<TValue> {
  pattern?: string | RegExp;
  flags?: string;
}

export interface NumericalityOptions<TValue = number> extends ValidatorConfiguration<TValue> {
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
