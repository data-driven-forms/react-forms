import { ReactNode } from 'react';
import { FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import { AnyObject } from './common';

export interface ValidatorType extends Object {
  type: string;
  message?: ReactNode;
}

export interface UseFieldApiConfig extends AnyObject {
  name: string;
  component: string;
  validate?: ValidatorType[];
}
export interface UseFieldApiComponentConfig extends UseFieldConfig<any>  {
  name: string;
}

export interface UseFieldApiProps<
 FieldValue,
T extends HTMLElement = HTMLElement> extends AnyObject {
  input: FieldInputProps<FieldValue, T>;
  meta: FieldMetaState<FieldValue>;
}

export default function(options: UseFieldApiConfig): UseFieldApiProps<any>;
