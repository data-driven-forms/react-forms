import AnyObject from './any-object';
import { FormEvent } from 'react';
import FieldConfig from './field-config';
import { FormValidator } from './validate';
import { Subscription } from './use-subscription';

export type Change = (name: string, value?: any) => void;
export type HandleSubmit = (event: FormEvent) => void;
export type RegisterField = (field: FieldConfig) => void;
export type UnregisterField = (field: FieldConfig) => void;
export type GetState = () => AnyObject;
export type OnSubmit = (values: AnyObject) => void;
export type GetFieldValue = (name: string) => any;
export type GetFieldState = (name: string) => AnyObject | undefined;
export type Focus = (name: string) => void;
export type Blur = (name: string) => void;
export type UpdateValid = (valid: boolean) => void;

export interface AsyncWatcherRecord {
  [key: number]: Promise<unknown>;
}

export interface AsyncWatcherApi {
  registerValidator: (callback: Promise<unknown>) => void;
}

export type AsyncWatcher = (updateValidating: (validating: boolean) => void, updateSubmitting: (submitting: boolean) => void) => AsyncWatcherApi;

export type Rerender = (subscribeTo?: Array<string>) => void;

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
  registerAsyncValidator: (validator: Promise<unknown>) => void;
  updateValid: UpdateValid;
  rerender: Rerender;
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

export interface CreateManagerApiConfig {
  onSubmit: OnSubmit;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  validate?: FormValidator;
  subscription?: Subscription;
}

declare type CreateManagerApi = (CreateManagerApiConfig: CreateManagerApiConfig) => ManagerApi;

export default CreateManagerApi;
