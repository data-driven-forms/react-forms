import { ReactNode } from 'react';
import { FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import { AnyObject } from '../common-types';

export interface ValidatorType extends Object {
  type: string;
  message?: ReactNode;
}

export interface UseFieldApiConfig extends AnyObject {
  name: string;
  validate?: ValidatorType[];
  skipRegistration?: boolean;
  useWarnings?: boolean;
}
export interface UseFieldApiComponentConfig extends UseFieldConfig<any>  {
  name: string;
}

export interface Meta<FieldValue> extends FieldMetaState<FieldValue> {
  warning?: any;
}

export interface UseFieldApiProps<
 FieldValue,
T extends HTMLElement = HTMLElement> extends AnyObject {
  input: FieldInputProps<FieldValue, T>;
  meta: Meta<FieldValue>;
}

export default function<T = any>(options: UseFieldApiConfig): UseFieldApiProps<T>;
