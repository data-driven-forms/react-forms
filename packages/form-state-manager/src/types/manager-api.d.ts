import AnyObject, { AnyBooleanObject } from './any-object';
import { FormEvent } from 'react';
import FieldConfig from './field-config';
import { FormValidator } from './validate';
import { Subscription, Meta } from './use-subscription';

export interface FieldState {
  value: any;
  meta: Meta;
  name: string;
}

export type UpdateFieldState = (name: string, mutateState: (prevState: FieldState) => FieldState) => void;

export type Callback = () => void;
export type Change = (name: string, value?: any) => void;
export type HandleSubmit = (event: FormEvent) => void;
export type RegisterField = (field: FieldConfig) => void;
export type UnregisterField = (field: Omit<FieldConfig, 'render'>) => void;
export type GetState = () => AnyObject;
export type OnSubmit = (values: AnyObject) => void;
export type GetFieldValue = (name: string) => any;
export type GetFieldState = (name: string) => AnyObject | undefined;
export type Focus = (name: string) => void;
export type Blur = (name: string) => void;
export type UpdateValid = (valid: boolean) => void;
export type UpdateError = (name: string, error: string | undefined) => void;
export type Batch = (callback: Callback) => void;

export interface AsyncWatcherRecord {
  [key: number]: Promise<unknown>;
}

export interface AsyncWatcherApi {
  registerValidator: (callback: Promise<unknown>) => void;
}

export type AsyncWatcher = (updateValidating: (validating: boolean) => void, updateSubmitting: (submitting: boolean) => void) => AsyncWatcherApi;

export type Rerender = (subscribeTo?: Array<string>) => void;

export type FieldRender = () => void;

export interface ListenerField {
  render: FieldRender;
  subscription?: Subscription;
}

export interface FieldListenerFields {
  [key: number]: ListenerField;
}

export interface FieldListener {
  count: number;
  state: FieldState;
  fields: FieldListenerFields;
}

export interface FieldListeners {
  [key: string]: FieldListener;
}

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
  setFieldState: UpdateFieldState;
  registerAsyncValidator: (validator: Promise<unknown>) => void;
  updateError: UpdateError;
  updateValid: UpdateValid;
  rerender: Rerender;
  batch: Batch;
  registeredFields: Array<string>;
  fieldListeners: FieldListeners;
  active: string | undefined;
  dirty: boolean;
  dirtyFields: AnyBooleanObject;
  dirtyFieldsSinceLastSubmit: AnyBooleanObject;
  dirtySinceLastSubmit: boolean;
  error: any;
  hasSubmitErrors: boolean;
  hasValidationErrors: boolean;
  initialValues: AnyObject;
  invalid: boolean;
  modified: AnyBooleanObject;
  modifiedSinceLastSubmit: boolean;
  submitError: any;
  submitErrors: AnyObject | undefined;
  submitFailed: boolean;
  submitSucceeded: boolean;
  submitting: boolean;
  touched: AnyBooleanObject;
  valid: boolean;
  validating: boolean;
  visited: AnyBooleanObject;
  initializeOnMount: boolean | undefined;
}

export type ManagerApi = () => ManagerState;

export interface CreateManagerApiConfig {
  onSubmit: OnSubmit;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  validate?: FormValidator;
  subscription?: Subscription;
  initialValues?: AnyObject;
}

declare type CreateManagerApi = (CreateManagerApiConfig: CreateManagerApiConfig) => ManagerApi;

export default CreateManagerApi;
