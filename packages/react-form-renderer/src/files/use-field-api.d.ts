import { ReactNode } from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

export interface ValidatorType extends Object {
  type: string;
  message?: ReactNode;
}

export interface UseFieldApiConfig extends Object {
  name: string;
  component: string;
  validate?: ValidatorType[];
}

export interface UseFieldApiProps extends Object {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
}

export default function(options: UseFieldApiConfig): UseFieldApiProps;
