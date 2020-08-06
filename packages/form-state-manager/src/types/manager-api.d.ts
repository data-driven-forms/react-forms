import AnyObject from './any-object';
import { FormEvent } from 'react';
import FieldState from './field-state';

export type Change = (name: string, value?: any) => void;
export type HandleSubmit = (event: FormEvent) => void;
export type RegisterField = (field: FieldState) => void;
export type UnregisterField = (field: FieldState) => void;
export type GetState = () => AnyObject;
export type OnSubmit = (values: AnyObject) => void;
export type GetFieldValue = (name: string) => any;
export type GetFieldState = (name: string) => AnyObject | undefined;
export type Focus = (name: string) => void;
export type Blur = (name: string) => void;

export interface ManagerState {
  values: AnyObject;
  errors: AnyObject;
  pristine: boolean;
  change: Change;
  focus: Focus;
  blur: Blur;
  handleSubmit: HandleSubmit;
  registerField: RegisterField;
  unregisterField: UnregisterField;
  getState: GetState;
  getFieldValue: GetFieldValue;
  getFieldState: GetFieldState;
  registeredFields: Array<string>;
  fieldListeners: AnyObject;
  active: string | undefined;
  dirty: boolean;
  dirtyFields: Array<string>;
  dirtyFieldsSinceLastSubmit: Array<string>;
  dirtySinceLastSubmit: boolean;
  error: any;
  hasSubmitErrors: boolean;
  hasValidationErrors: boolean;
  initialValues: AnyObject;
  invalid: boolean;
  modified: AnyObject;
  modifiedSinceLastSubmit: boolean;
  submitError: any;
  submitErrors: AnyObject;
  submitFailed: boolean;
  submitSucceeded: boolean;
  submitting: boolean;
  touched: AnyObject;
  valid: boolean;
  validating: boolean;
  visited: AnyObject;
}

export type ManagerApi = () => ManagerState;

declare type CreateManagerApi = (onSubmit: OnSubmit) => ManagerApi;

export default CreateManagerApi;
