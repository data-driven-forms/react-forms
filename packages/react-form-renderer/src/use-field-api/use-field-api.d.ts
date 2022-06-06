import { ReactNode } from 'react';
import { AnyObject } from '../common-types/any-object';
import { Meta as FieldMetaState, Input as FieldInputProps, UseFieldConfig } from '@data-driven-forms/form-state-manager/use-field';


export interface ValidatorType extends Object {
  type: string;
  message?: ReactNode;
}

export interface UseFieldApiConfig extends AnyObject {
  name: string;
  validate?: ValidatorType[];
}
export interface UseFieldApiComponentConfig extends UseFieldConfig {
  name: string;
}

export interface Meta extends FieldMetaState {}

export interface UseFieldApiProps<
 FieldValue,
T extends HTMLElement = HTMLElement> extends AnyObject {
  input: FieldInputProps<FieldValue, T>;
  meta: Meta;
}

export default function<T = any>(options: UseFieldApiConfig): UseFieldApiProps<T>;
