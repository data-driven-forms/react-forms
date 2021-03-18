import { FormEvent } from 'react';
import AnyObject from './any-object';
import { Batch, Change, ManagerState, GetState, Blur, Focus, Unsubscribe, Subscribe, UpdateFieldConfig } from './manager-api';
import FieldConfig from './field-config';
import FieldArrayApi from './use-field-array-api';

export interface Action extends AnyObject {
  type: string;
}

export interface ManagerContextValue extends FieldArrayApi {
  batch: Batch;
  handleSubmit: (event: FormEvent) => void;
  registerField: (fieldState: FieldConfig) => void;
  unregisterField: (fieldState: Omit<FieldConfig, 'render'>) => void;
  change: Change;
  getState: GetState;
  formOptions: ManagerState;
  getFieldValue: (name: string) => any;
  getFieldState: (name: string) => AnyObject | undefined;
  blur: Blur;
  focus: Focus;
  clearedValue?: any;
  initialValues?: AnyObject;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  updateFieldConfig: UpdateFieldConfig;
}

export interface ManagerContext {
  value: ManagerContextValue;
}

export default ManagerContext;
