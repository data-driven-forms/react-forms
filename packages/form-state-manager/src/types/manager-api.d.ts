import AnyObject from './any-object';
import { FormEvent } from 'react';
import FieldState from './field-state';

export type Change = (name: string, value?: any) => void;
export type HandleSubmit = (event: FormEvent) => void;
export type RegisterField = (field: FieldState) => void;
export type UnregisterField = (field: FieldState) => void;
export type GetState = () => AnyObject;
export type OnSubmit = (values: AnyObject) => void;

export interface ManagerState {
  values: AnyObject;
  errors: AnyObject;
  pristine: boolean;
  change: Change;
  handleSubmit: HandleSubmit;
  registerField: RegisterField;
  unregisterField: UnregisterField;
  getState: GetState;
  registeredFields: Array<string>;
  fieldListeners: AnyObject;
}

export type ManagerApi = () => ManagerState;

declare type CreateManagerApi = (onSubmit: OnSubmit) => ManagerApi;

export default CreateManagerApi;
