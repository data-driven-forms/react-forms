import { FormEvent } from 'react';
import AnyObject from './any-object';
import { Change, ManagerApi, GetState, Blur, Focus } from './manager-api';
import FieldConfig from './field-config';

export interface Action extends AnyObject {
  type: string;
}

export interface ManagerContextValue {
  handleSubmit: (event: FormEvent) => void;
  registerField: (fieldState: FieldConfig) => void;
  unregisterField: (fieldState: FieldConfig) => void;
  change: Change;
  getState: GetState;
  formOptions: ManagerApi;
  getFieldValue: (name: string) => any;
  getFieldState: (name: string) => AnyObject | undefined;
  blur: Blur;
  focus: Focus;
}

export interface ManagerContext {
  value: ManagerContextValue;
}

export default ManagerContext;
