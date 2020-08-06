import { FormEvent } from 'react';
import AnyObject from './any-object';
import { Change, ManagerApi, GetState } from './manager-api';
import FieldState from './field-state';

export interface Action extends AnyObject {
  type: string;
}

export interface ManagerContextValue {
  handleSubmit: (event: FormEvent) => void;
  registerField: (fieldState: FieldState) => void;
  unregisterField: (fieldState: FieldState) => void;
  change: Change;
  getState: GetState;
  formOptions: ManagerApi;
  getFieldValue: (name: string) => any;
  getFieldState: (name: string) => AnyObject | undefined;
}

export interface ManagerContext {
  value: ManagerContextValue;
}

export default ManagerContext;
