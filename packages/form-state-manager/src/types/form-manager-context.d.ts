import { FormEvent } from 'react';
import AnyObject from './any-object';
import { Change, ManagerApi, GetState, Blur, Focus, Unsubscribe, Subscribe } from './manager-api';
import FieldConfig from './field-config';

export interface Action extends AnyObject {
  type: string;
}

export interface ManagerContextValue {
  handleSubmit: (event: FormEvent) => void;
  registerField: (fieldState: FieldConfig) => void;
  unregisterField: (fieldState: Omit<FieldConfig, 'render'>) => void;
  change: Change;
  getState: GetState;
  formOptions: ManagerApi;
  getFieldValue: (name: string) => any;
  getFieldState: (name: string) => AnyObject | undefined;
  blur: Blur;
  focus: Focus;
  clearedValue?: any;
  initialValues?: AnyObject;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
}

export interface ManagerContext {
  value: ManagerContextValue;
}

export default ManagerContext;
