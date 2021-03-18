import AnyObject, { AnyBooleanObject } from './any-object';
import { FormEvent } from 'react';
import FieldConfig, { IsEqual, AfterSubmit, BeforeSubmit } from './field-config';
import { FormValidator, Validator } from './validate';
import { Subscription, Meta } from './use-field';

export interface FieldState {
  value: any;
  meta: Meta;
  name: string;
}

export interface ExtendedFieldState extends FieldState {
  change: (value: any) => any;
  blur: () => void;
  focus: () => void;
}

export type UpdateFieldState = (name: string, mutateState: (prevState: FieldState) => FieldState) => void;

export type Callback = () => void;
export type Change = (name: string, value?: any) => void;
export type HandleSubmit = (event?: FormEvent) => void;
export type RegisterField = (field: FieldConfig) => void;
export type UnregisterField = (field: Omit<FieldConfig, 'render'>) => void;
export type GetState = () => ManagerState;
export type OnSubmit = (values: AnyObject, formApi: ManagerState, event?: FormEvent) => any;
export type GetFieldValue = (name: string) => any;
export type GetFieldState = (name: string) => ExtendedFieldState | undefined;
export type Focus = (name: string) => void;
export type Blur = (name: string) => void;
export type UpdateValid = (valid: boolean) => void;
export type UpdateError = (name: string, error: string | undefined) => void;
export type Batch = (callback: Callback) => void;
export type Render = () => void;
export type Subscribe = (subscriberConfig: SubscriberConfig, isField?: boolean, isForm?: boolean) => void;
export type Unsubscribe = (subscriberConfig: Omit<SubscriberConfig, 'render'>) => void;
export type Reset = (initialValues?: AnyObject) => void;
export type Restart = () => void;
export type ResetFieldState = (name: string) => void;
export type InitilizeInputFunction = (formValues: AnyObject) => AnyObject;
export type Initilize = (initialValues: AnyObject | InitilizeInputFunction) => void;
export type IsValidationPaused = () => boolean;
export type PauseValidation = () => void;
export type ResumeValidation = () => void;
export type SetConfig = (attribute: keyof CreateManagerApiConfig, value: any) => void;
export type AfterSilentRegistration = (field: Omit<FieldConfig, 'render'>) => void;
export type RegisterInputFile = (name: string) => void;
export type UnregisterInputFile = (name: string) => void;
export type GetRegisteredFields = () => Array<string>;
export type UpdateFieldConfig = (field: UpdatedConfig) => void;
export interface AsyncWatcherRecord {
  [key: number]: Promise<unknown>;
}

export interface AsyncWatcherApi {
  registerValidator: (callback: Promise<unknown>) => void;
}

export type AsyncWatcher = (
  updateValidating: (validating: boolean) => void,
  updateSubmitting: (submitting: boolean) => void,
  updateFormValidating: (increment: number) => void
) => AsyncWatcherApi;

export type Rerender = (subscribeTo?: Array<string>) => void;

export type FieldRender = () => void;

export interface ListenerField {
  render: FieldRender;
  subscription?: Subscription;
  afterSubmit?: AfterSubmit;
  beforeSubmit?: BeforeSubmit;
  validate?: Validator;
  isEqual?: IsEqual;
}

export interface FieldListenerFields {
  [key: string]: ListenerField;
}

export interface FieldListener {
  count: number;
  state: FieldState;
  asyncWatcher: AsyncWatcherApi;
  fields: FieldListenerFields;
  validateFields?: Array<string>;
  isForm?: boolean;
}

export interface FieldListeners {
  [key: string]: FieldListener;
}

export type ManagerApiFunctions =
  | 'change'
  | 'focus'
  | 'blur'
  | 'handleSubmit'
  | 'registerField'
  | 'unregisterField'
  | 'getState'
  | 'getFieldValue'
  | 'getFieldState'
  | 'setFieldState'
  | 'registerAsyncValidator'
  | 'updateError'
  | 'updateValid'
  | 'rerender'
  | 'batch'
  | 'subscribe'
  | 'unsubscribe'
  | 'reset'
  | 'restart'
  | 'resetFieldState'
  | 'initialize'
  | 'submit'
  | 'isValidationPaused'
  | 'pauseValidation'
  | 'resumeValidation'
  | 'setConfig'
  | 'afterSilentRegistration'
  | 'registerInputFile'
  | 'unregisterInputFile'
  | 'getRegisteredFields'
  | 'updateFieldConfig';

export interface ManagerState {
  values: AnyObject;
  errors: AnyObject;
  pristine: boolean;
  change: Change;
  focus: Focus;
  blur: Blur;
  handleSubmit: HandleSubmit;
  submit: HandleSubmit;
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
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  reset: Reset;
  restart: Restart;
  resetFieldState: ResetFieldState;
  initialize: Initilize;
  isValidationPaused: IsValidationPaused;
  pauseValidation: PauseValidation;
  resumeValidation: ResumeValidation;
  setConfig: SetConfig;
  afterSilentRegistration: AfterSilentRegistration;
  getRegisteredFields: GetRegisteredFields;
  updateFieldConfig: UpdateFieldConfig;
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
  destroyOnUnregister: boolean | undefined;
  fileInputs: Array<any>;
  registerInputFile: RegisterInputFile;
  unregisterInputFile: UnregisterInputFile;
}

export type ManagerApi = () => ManagerState;

export type Debug = (formState: ManagerState) => void;

export interface SubscriberConfig extends AnyObject {
  name: string | number;
  subscription?: Subscription;
  render: FieldRender;
  validate?: Validator;
  internalId?: number | string;
  isEqual?: IsEqual;
  validateFields?: Array<string>;
  afterSubmit?: AfterSubmit;
  beforeSubmit?: BeforeSubmit;
}

export interface UpdatedConfig {
  validate?: Validator;
  initialValue?: any;
  defaultValue?: any;
  name: string;
  internalId: number | string;
  initializeOnMount?: boolean;
}

export interface CreateManagerApiConfig {
  onSubmit: OnSubmit;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  validate?: FormValidator;
  subscription?: Subscription;
  initialValues?: AnyObject;
  debug?: Debug;
  keepDirtyOnReinitialize?: boolean;
  destroyOnUnregister?: boolean;
  name?: string;
}

declare type CreateManagerApi = (CreateManagerApiConfig: CreateManagerApiConfig) => ManagerApi;

export default CreateManagerApi;
