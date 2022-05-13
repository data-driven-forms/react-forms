import { FormEvent } from 'react';

import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import composeValidators from '../compose-validators';
import AnyObject, { AnyBooleanObject } from '../any-object';
import FieldConfig, { AfterSubmit, BeforeSubmit, IsEqual } from '../field-config';
import { Meta, Subscription } from '../use-field';
import { WarningObject } from '../compose-validators';
import { formLevelValidator, isPromise } from '../validate';
import { FormValidator, FormLevelError, Validator } from '../validate';
import findDifference from '../find-difference';
import FORM_ERROR from '../form-error';
import focusError from '../focus-error';
import getCacheKey from '../get-cache-key';

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

export type FieldRender = () => void;
export type UpdateFieldState = (name: string, mutateState: (prevState: FieldState) => FieldState) => void;
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
export type Change = (name: string, value?: any) => void;
export type Callback = () => void;
export type Focus = (name: string) => void;
export type Blur = (name: string) => void;
export type HandleSubmit = (event?: FormEvent) => void;
export type RegisterField = (field: FieldConfig) => void;
export type UnregisterField = (field: Omit<FieldConfig, 'render'>) => void;
export type GetFieldValue = (name: string) => any;
export type GetFieldState = (name: string) => ExtendedFieldState | undefined;
export type UpdateValid = (valid: boolean) => void;
export type UpdateError = (name: string, error: string | undefined) => void;
export type Batch = (callback: Callback) => void;
export type Render = () => void;
export type Rerender = (subscribeTo?: Array<string>) => void;
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
export type AfterSilentRegistration = (field: Omit<FieldConfig, 'render'>) => void;
export type SetConfig = (
  attribute:
    | 'onSubmit'
    | 'clearOnUnmount'
    | 'initializeOnMount'
    | 'validate'
    | 'subscription'
    | 'initialValues'
    | 'debug'
    | 'keepDirtyOnReinitialize'
    | 'destroyOnUnregister'
    | 'name',
  value: any
) => void;
export type RegisterInputFile = (name: string) => void;
export type UnregisterInputFile = (name: string) => void;
export type GetRegisteredFields = () => Array<string>;
export interface UpdatedConfig {
  validate?: Validator;
  initialValue?: any;
  defaultValue?: any;
  name: string;
  internalId: number | string;
  initializeOnMount?: boolean;
}
export type UpdateFieldConfig = (field: UpdatedConfig) => void;

export interface AsyncWatcherRecord {
  [key: number]: Promise<unknown>;
}

export interface AsyncWatcherApi {
  registerValidator: (callback: Promise<unknown>) => void;
  getValidators: () => AsyncWatcherRecord
}
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
  getState: () => ManagerState;
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
export type OnSubmit = (values: AnyObject, formApi: ManagerState, event?: FormEvent) => any;
export interface CreateManagerApiConfig {
  onSubmit: OnSubmit;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  validate?: FormValidator;
  subscription?: Subscription;
  initialValues?: AnyObject;
  debug?: (formState: ManagerState) => void;
  keepDirtyOnReinitialize?: boolean;
  destroyOnUnregister?: boolean;
  name?: string;
}

export type Debug = (formState: ManagerState) => void;

export type AsyncWatcher = (
  updateValidating: (validating: boolean) => void,
  updateSubmitting: (submitting: boolean) => void,
  updateFormValidating: (increment: number) => void
) => AsyncWatcherApi;
export type GetState = () => ManagerState;

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

export type ManagerApi = () => ManagerState;

declare type CreateManagerApi = (CreateManagerApiConfig: CreateManagerApiConfig) => ManagerApi;

export const defaultIsEqual = (a: any, b: any) => a === b;

const isLast = (fieldListeners: AnyObject, name: string, registeringFields: string[]) =>
  fieldListeners?.[name]?.count - registeringFields.filter((field) => field === name).length === 1;

const noState = (fieldListeners: AnyObject, name: string) => !fieldListeners?.[name]?.state;

const addIfUnique = (array: Array<string>, item: string) => !array.includes(item) && array.push(item);

export const shouldExecute = (formLevel: boolean | undefined, fieldLevel: boolean | undefined): boolean =>
  Boolean((formLevel || fieldLevel) && fieldLevel !== false);

export const isDefined = (object: AnyObject, key: string): boolean => Object.prototype.hasOwnProperty.call(object, key);

type objectMapFunction = (value: any, key: any) => any;

// TODO: try to optimize
const traverseObject = (object: AnyObject, callback: objectMapFunction) => Object.keys(object).forEach((key) => callback(object[key], key));

const asyncWatcher: AsyncWatcher = (updateValidating, updateSubmitting, updateFormValidating) => {
  let nextKey = 0;
  const asyncValidators: AsyncWatcherRecord = {};
  // const asyncSubmissions: AsyncWatcherRecord = {};

  const resolveValidator = (resolveKey: number): void => {
    delete asyncValidators[resolveKey];
    updateFormValidating(-1);
    updateValidating(Object.keys(asyncValidators).length !== 0);
  };

  const registerValidator = (callback: Promise<unknown>) => {
    updateFormValidating(1);
    const resolveKey = nextKey;
    asyncValidators[nextKey] = callback;
    updateValidating(Object.keys(asyncValidators).length !== 0);
    callback.then(() => resolveValidator(resolveKey)).catch(() => resolveValidator(resolveKey));
    nextKey = nextKey + 1;
  };

  const getValidators = () => asyncValidators  

  return {
    registerValidator,
    getValidators,
  };
};

export function flatObject(obj: AnyObject): AnyObject {
  const flatObject: AnyObject = {};
  const path: Array<string> = [];
  const mark = '<REMOVE';

  // remove only .[ combinations that was inserted from this parser, not from custom names
  const removeMark = (str: string) => str.replace(new RegExp(`.${mark}`, 'g'), '');

  function dig(obj: AnyObject) {
    if (Array.isArray(obj)) {
      return obj.forEach((field, index) => {
        path.push(`${mark}[${index}]`);
        dig(field);
        path.pop();
      });
    }

    if (typeof obj !== 'object') {
      return (flatObject[removeMark(path.join('.'))] = obj);
    }

    for (const key in obj) {
      path.push(key);
      dig(obj[key]);
      path.pop();
    }
  }

  dig(obj);
  return flatObject;
}

export function unFlatObject(obj: AnyObject): AnyObject {
  const nestedStructure = {};
  Object.entries(obj).forEach(([key, value]) => {
    set(nestedStructure, key, value);
  });

  return nestedStructure;
}

export const removeEmpty = (obj: AnyObject): AnyObject => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      if (isEmpty(obj[key])) {
        delete obj[key];
      } else {
        removeEmpty(obj[key]);
      }
    } else if (typeof obj[key] === 'undefined') {
      delete obj[key];
    }
  });
  return obj;
};

export const initialMeta = (initial: any): Meta => ({
  active: false,
  data: {},
  dirty: false,
  dirtySinceLastSubmit: false,
  error: undefined,
  initial,
  invalid: false,
  modified: false,
  modifiedSinceLastSubmit: false,
  pristine: true,
  submitError: undefined,
  submitFailed: false,
  submitSucceeded: false,
  submitting: false,
  touched: false,
  valid: true,
  validating: false,
  visited: false,
  warning: undefined
});

export const createField = (name: string, value: any): FieldState => ({
  name,
  value,
  meta: initialMeta(value)
});

export const initialFormState = (initialValues: AnyObject = {}): Omit<ManagerState, ManagerApiFunctions | 'destroyOnUnregister'> => ({
  values: cloneDeep(initialValues),
  errors: {},
  pristine: true,
  registeredFields: [],
  fieldListeners: {},
  active: undefined,
  dirty: false,
  dirtyFields: {},
  dirtyFieldsSinceLastSubmit: {},
  dirtySinceLastSubmit: false,
  error: undefined,
  hasSubmitErrors: false,
  hasValidationErrors: false,
  initialValues,
  invalid: false,
  modified: {},
  modifiedSinceLastSubmit: false,
  submitError: undefined,
  submitErrors: undefined,
  submitFailed: false,
  submitSucceeded: false,
  submitting: false,
  touched: {},
  valid: true,
  validating: false,
  visited: {},
  fileInputs: []
});

const createManagerApi: CreateManagerApi = ({
  onSubmit,
  clearOnUnmount,
  initializeOnMount,
  validate,
  subscription,
  initialValues,
  debug,
  keepDirtyOnReinitialize,
  destroyOnUnregister,
  name
}) => {
  const config: CreateManagerApiConfig = {
    onSubmit,
    clearOnUnmount,
    initializeOnMount,
    validate,
    subscription,
    debug,
    keepDirtyOnReinitialize,
    destroyOnUnregister,
    name
  };

  let state: ManagerState = {
    change,
    focus,
    blur,
    handleSubmit,
    submit: handleSubmit,
    registerField,
    unregisterField,
    getState,
    getFieldValue,
    getFieldState,
    setFieldState,
    registerAsyncValidator,
    updateError,
    updateValid,
    rerender,
    batch,
    subscribe,
    unsubscribe,
    reset,
    restart: () => reset(),
    resetFieldState,
    initialize,
    isValidationPaused,
    pauseValidation,
    resumeValidation,
    setConfig,
    afterSilentRegistration,
    destroyOnUnregister,
    registerInputFile,
    unregisterInputFile,
    getRegisteredFields,
    updateFieldConfig,
    ...initialFormState(initialValues)
  };
  let inBatch = 0;
  let batched: Array<string> = [];
  let shouldRerender = false;
  let validationPaused = false;
  let runFormValidation = false;
  let revalidatedFields: Array<string> = [];
  let registeringField: string | number | undefined;
  let isSilent = 0;
  let silentRender: string[] = [];
  let runningValidators = 0;
  let flatSubmitErrors: AnyObject = {};
  let flatErrors: AnyObject = {};
  const registeringFields: string[] = [];
  const validationCache = new Map<string, FieldState>()

  function updateRunningValidators(increment: number): void {
    runningValidators = Math.max(runningValidators + increment, 0);

    const validating = runningValidators > 0;

    if (state.validating !== validating) {
      state.validating = validating;
      rerender(['validating']);
    }
  }

  const asyncWatcherApi = asyncWatcher(updateValidating, updateSubmitting, updateRunningValidators);

  const managerApi: ManagerApi = () => state;

  function setConfig(attribute: keyof CreateManagerApiConfig, value: CreateManagerApiConfig[keyof CreateManagerApiConfig]) {
    (config as AnyObject)[attribute] = value;
  }

  function isValidationPaused() {
    return validationPaused;
  }

  function pauseValidation() {
    validationPaused = true;
  }

  function resumeValidation() {
    validationPaused = false;

    if (revalidatedFields.length > 0) {
      revalidateFields(revalidatedFields);
      revalidatedFields = [];
    }

    if (runFormValidation && config.validate) {
      validateForm(config.validate);
    }

    runFormValidation = false;
  }

  function handleFieldError(name: string, isValid: boolean, error: string | undefined = undefined, validating = false, cacheKey: string) {
    const prevMeta = getFieldState(name)?.meta || ({} as Meta);
    const { error: prevError, valid: prevIsValid, validating: prevValidating } = prevMeta;
    if (error !== prevError || isValid !== prevIsValid || validating !== prevValidating) {
      setFieldState(name, (prev: FieldState) => ({
          ...prev,
          meta: {
            ...prev.meta,
            error,
            valid: isValid,
            invalid: !isValid,
            validating,
            warning: undefined
          }
      }));
    }
    
    validationCache.set(cacheKey, getFieldState(name)!)
    updateError(name, isValid ? undefined : error);
  }

  function handleFieldWarning(name: string, warning: string | undefined = undefined, validating = false, cacheKey: string, ) {
    const prevMeta = getFieldState(name)?.meta || ({} as Meta);
    const { warning: prevWarning, validating: prevValidating } = prevMeta;
    if (warning !== prevWarning || validating !== prevValidating) {
      setFieldState(name, (prev: FieldState) => {        
        const newState = {
          ...prev,
          meta: {
            ...prev.meta,
            warning,
            error: undefined,
            valid: true,
            invalid: false,
            validating
          }}
          validationCache.set(cacheKey, newState)
        return newState});
    }
  }

  async function validateField(name: string, value: any) {
    const cacheKey = getCacheKey({ name, value })

    if(validationCache.has(cacheKey)) {
      const cacheState = validationCache.get(cacheKey)
      /**
       * Skip state update and object
       * We don't want to create new object reference and this trigger additional rendering
       * We can re-use the same object instead
       */
      state.fieldListeners[name].state = cacheState!;
      updateError(name, cacheState!.meta.error)
      return
    }
    if (validationPaused) {
      addIfUnique(revalidatedFields, name);
      return undefined;
    }

    // TODO Memoize validation results
    if (Object.prototype.hasOwnProperty.call(state.fieldListeners, name)) {
      const listener = state.fieldListeners[name].asyncWatcher;
      const validators = Object.values(state.fieldListeners[name].fields)
        .map(({ validate }) => validate)
        .filter((validator) => validator !== undefined);

      if (validators.length > 0) {
        const result = composeValidators(validators as Validator[])(value, state.values, { ...state.fieldListeners[name].state.meta });
        if (isPromise(result)) {
          handleFieldError(name, true, undefined, true, cacheKey);
          (result as Promise<string | undefined>)
            .then(() => handleFieldError(name, true, undefined, false, cacheKey))
            .catch((response) => {
              if (response?.type === 'warning') {
                handleFieldWarning(name, response.error, undefined, cacheKey);
              } else {
                handleFieldError(name, false, response as string | undefined, false, cacheKey);
              }
            });
          listener.registerValidator(result as Promise<string | undefined>);
        } else {
          if ((result as WarningObject)?.type === 'warning') {
            handleFieldWarning(name, (result as WarningObject).error, undefined, cacheKey);
          } else {
            handleFieldError(name, !result, result as string | undefined, undefined, cacheKey);
          }
        }
      }
    }
  }

  function reset(resetInitialValues?: AnyObject) {
    batch(() => {
      const render = prepareRerender();

      state = {
        ...state,
        ...initialFormState(resetInitialValues || initialValues),
        fieldListeners: state.fieldListeners,
        registeredFields: state.registeredFields
      };

      state.registeredFields.forEach(resetFieldState);

      revalidateFields(state.registeredFields);

      if (config.validate) {
        validateForm(config.validate);
      }

      render();
    });
  }

  function initialize(initialValues: AnyObject | InitilizeInputFunction = {}) {
    batch(() => {
      const render = prepareRerender();
      state.pristine = true;

      const convertedValues = typeof initialValues === 'function' ? initialValues(state.values) : initialValues;
      let clonedValues = cloneDeep(convertedValues);
      let dirtyFields = config.keepDirtyOnReinitialize ? cloneDeep(state.values) : {};

      if (config.keepDirtyOnReinitialize) {
        traverseObject(flatObject(dirtyFields), (value, name) => {
          if (!state.dirtyFields[name]) {
            dirtyFields = omit(dirtyFields, name);
          }
        });
      }

      traverseObject(flatObject(convertedValues), (value, key) => {
        const fieldState = state.fieldListeners[key]?.state;

        if (fieldState) {
          if (config.keepDirtyOnReinitialize) {
            if (!state.dirtyFields[key]) {
              setFieldState(key, (prevState) => ({
                ...prevState,
                value,
                meta: {
                  ...prevState.meta,
                  pristine: true,
                  dirty: false
                }
              }));

              state.dirtyFields[key] = fieldState.meta.dirty;
            } else {
              clonedValues = omit(clonedValues, key);
            }
          } else {
            setFieldState(key, (prevState) => ({
              ...prevState,
              value,
              meta: {
                ...prevState.meta,
                pristine: true,
                dirty: false
              }
            }));

            state.dirtyFields[key] = fieldState.meta.dirty;
          }
        }
      });

      state.initialValues = initialValues;

      state.values = merge(removeEmpty(clonedValues), dirtyFields);

      render();
    });
  }

  function validateForm(validate: FormValidator) {
    if (validationPaused) {
      runFormValidation = true;
      return undefined;
    }

    const result = formLevelValidator(validate, state.values, managerApi);
    const currentInvalidFields = Object.keys(state.errors);
    if (isPromise(result)) {
      const asyncResult = result as Promise<FormLevelError>;

      flatErrors = {};
      state.errors = {};
      state.hasValidationErrors = false;
      state.valid = true;
      state.invalid = false;
      state.error = undefined;

      return asyncResult
        .then(() => {
          if (!state.validating) {
            revalidateFields(currentInvalidFields);
          }
        })
        .catch((errors) => {
          const render = prepareRerender();

          state.errors = errors;
          state.hasValidationErrors = true;
          state.valid = false;
          state.invalid = true;
          state.error = state.errors?.[FORM_ERROR];

          flatErrors = flatObject(errors);
          Object.keys(flatErrors).forEach((name) => {
            handleFieldError(name, false, flatErrors[name], undefined, 'formLevel');
          });

          render();
        });
    }

    const syncError = result as FormLevelError | undefined;
    if (syncError) {
      flatErrors = flatObject(syncError);
      Object.keys(flatErrors).forEach((name) => {
        const value = getFieldValue(name)
        const cacheKey = getCacheKey({name, value })
        const listener = state.fieldListeners[name]?.asyncWatcher;
        const fieldListeners = Object.values(state.fieldListeners[name]?.fields || {})
        const validators = []
        for (let index = 0; index < fieldListeners.length; index++) {
          const { validate } = fieldListeners[index];
          if(validate) {
            validators.push(validate)
          }
        }
        // TODO: Do not make the whole thing promise if not required
        validators.push(() => Promise.reject(get(syncError, name)))
        const result = composeValidators(validators as Validator[])(value, state.values, { ...state.fieldListeners[name]?.state.meta });
        if(isPromise(result)) {
          listener?.registerValidator(result as Promise<string | undefined>);
          Promise.allSettled(Object.values(listener?.getValidators() || {})).then(() => {
            handleFieldError(name, true, undefined, true, cacheKey);
            (result as Promise<string | undefined>)
              .then(() => {
                handleFieldError(name, true, undefined, false, cacheKey)
              })
              .catch((response) => {
                if (response?.type === 'warning') {
                  handleFieldWarning(name, response.error, undefined, cacheKey);
                } else {
                  handleFieldError(name, false, response as string | undefined, false, cacheKey);
                }
              });
          })
        }
      });
      state.errors = syncError;
      state.hasValidationErrors = true;
      state.valid = false;
      state.invalid = true;
      state.error = state.errors?.[FORM_ERROR];
    } else {
      state.errors = {};
      state.hasValidationErrors = false;
      state.valid = true;
      state.invalid = false;
      state.error = undefined;
      flatErrors = {};
      /**
       * Fields have to be revalidated on field level to synchronize the form and field errors
       */
      revalidateFields(currentInvalidFields);
    }
  }

  function revalidateFields(fields: string[]) {
    for (let index = 0; index < fields.length; index++) {
      const name = fields[index];
      validateField(name, get(state.values, name));
    }
  }

  function prepareRerender() {
    const snapshot = cloneDeep(state);

    return (subscribeTo: Array<string> = []) => {
      const changedAttributes = [...findDifference(snapshot, state), ...subscribeTo];

      if (isSilent > 0) {
        changedAttributes.forEach((attr) => addIfUnique(silentRender, attr));
      } else if (changedAttributes.length > 0) {
        rerender(changedAttributes);
      }
    };
  }

  function change(name: string, value?: any): void {
    // TODO modify all affected field state variables
    batch(() => {
      const render = prepareRerender();
      set(state.values, name, value);
      state.visited[name] = true;
      state.modified[name] = true;
      state.modifiedSinceLastSubmit = true;
      state.dirtySinceLastSubmit = true;
      state.dirtyFields[name] = true;
      state.dirtyFieldsSinceLastSubmit[name] = true;

      const allIsEqual: Array<IsEqual> = state.fieldListeners[name]
        ? Object.values(state.fieldListeners[name].fields)
          .map(({ isEqual }) => isEqual as IsEqual, [])
          .filter(Boolean)
        : [];

      const isEqualFn =
        allIsEqual.length > 0 ? (a: any, b: any) => allIsEqual.reduce((acc: boolean, curr: IsEqual) => acc && curr(a, b), true) : defaultIsEqual;

      const pristine = isEqualFn(value, state.fieldListeners[name]?.state?.meta?.initial || get(state.initialValues, name));

      setFieldState(name, (prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          pristine,
          dirty: !pristine
        },
        value
      }));

      const setDirty = isFormDirty();

      state.pristine = !setDirty;
      state.dirty = setDirty;

      revalidateFields([name, ...(state.fieldListeners[name]?.validateFields || state.registeredFields.filter((n) => n !== name))]);

      if (config.validate) {
        validateForm(config.validate);
      }

      render();
    });
  }

  function isFormDirty(): boolean {
    return Object.entries(state.fieldListeners).some(([, field]) => field?.state?.meta?.dirty);
  }

  function focus(name: string): void {
    if (state.active !== name) {
      const render = prepareRerender();

      state.active = name;
      state.visited[name] = true;
      setFieldState(name, (prevState) => ({ ...prevState, meta: { ...prevState.meta, visited: true, active: true } }));

      render();
    }
  }

  function blur(name: string): void {
    if (state.active === name) {
      state.active = undefined;

      setFieldState(name, (prevState) => ({ ...prevState, meta: { ...prevState.meta, active: false, touched: true } }));
      rerender(['active']);
    }
  }

  function handleSubmit(event?: FormEvent): void {
    if (event) {
      typeof event.preventDefault && typeof event.preventDefault === 'function' && event.preventDefault();
      typeof event.stopPropagation && typeof event.stopPropagation === 'function' && event.stopPropagation();
    }

    if (state.submitting) {
      return;
    }

    if (state.invalid) {
      state.registeredFields.forEach((name) => {
        setFieldState(name, (state) => ({
          ...state,
          meta: {
            ...state.meta,
            touched: true
          }
        }));
      });

      focusError(state.errors, config.name);

      return;
    }

    state.registeredFields.forEach((name) => {
      const warning = getFieldState(name)?.meta.warning;

      if (warning) {
        setFieldState(name, (state) => ({
          ...state,
          meta: {
            ...state.meta,
            touched: true
          }
        }));
      }
    });

    let error = false;
    state.registeredFields.forEach((name) =>
      traverseObject(state.fieldListeners[name].fields, (field) => {
        error = error || (field.beforeSubmit && field.beforeSubmit() === false);
      })
    );

    if (error) {
      return;
    }

    const result = config.onSubmit({ ...state.values }, { ...state, values: { ...state.values } }, event);

    if (isPromise(result)) {
      setSubmitting();
      const render = prepareRerender();

      result
        .then((errors: unknown) => {
          handleSubmitError(errors);
          updateFieldSubmitMeta();
          render();
          focusError(flatSubmitErrors, config.name);

          runAfterSubmit();
        })
        .catch(() => {
          handleSubmitError();
          updateFieldSubmitMeta();
          render();
        });
    } else {
      const render = prepareRerender();

      handleSubmitError(result);
      updateFieldSubmitMeta();

      render();

      focusError(flatSubmitErrors, config.name);

      runAfterSubmit();
    }
  }

  function updateFieldSubmitMeta(): void {
    traverseObject(state.fieldListeners, (field, name) => {
      if (field.state) {
        setFieldState(
          name,
          (prevState) => ({
            ...prevState,
            meta: {
              ...prevState.meta,
              submitFailed: state.submitFailed,
              submitSucceeded: state.submitSucceeded,
              submitError: flatSubmitErrors[name],
              submitting: state.submitting,
              ...(flatSubmitErrors[name] && { touched: true, valid: false, invalid: true })
            }
          }),
          true
        );
      }
    });
  }

  function handleSubmitError(errors?: any): void {
    state.submitting = false;
    if (errors) {
      state.submitErrors = errors;
      state.hasSubmitErrors = true;
      state.submitFailed = true;
      state.submitSucceeded = false;
      state.submitError = state.submitErrors?.[FORM_ERROR];
      flatSubmitErrors = flatObject(errors);
      state.valid = false;
      state.invalid = true;
    } else {
      state.submitErrors = undefined;
      state.hasSubmitErrors = false;
      state.submitFailed = false;
      state.submitSucceeded = true;
      state.submitError = undefined;
      flatSubmitErrors = {};
      state.valid = true;
      state.invalid = false;
    }
  }

  function setSubmitting() {
    const render = prepareRerender();

    state.submitErrors = undefined;
    state.hasSubmitErrors = false;
    state.submitFailed = false;
    state.submitSucceeded = false;
    state.submitting = true;
    state.submitError = undefined;

    updateFieldSubmitMeta();

    render();
  }

  function runAfterSubmit() {
    state.registeredFields.forEach((name) =>
      traverseObject(state.fieldListeners[name].fields, (field) => {
        field.afterSubmit && field.afterSubmit();
      })
    );
  }

  function isInitialized(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(state.fieldListeners, name);
  }

  function initializeFieldValue(field: FieldConfig | UpdatedConfig): boolean {
    if (
      shouldExecute(config.initializeOnMount, field.initializeOnMount) ||
      (!isInitialized(field.name) && typeof field.initialValue !== 'undefined')
    ) {
      let initialValue: any;

      if (shouldExecute(config.initializeOnMount, field.initializeOnMount) && isDefined(field, 'initialValue')) {
        initialValue = field.initialValue;
      } else {
        initialValue = get(state.initialValues, field.name);
        initialValue = typeof initialValue === 'undefined' ? field.initialValue : initialValue;
      }

      set(
        state.values,
        field.name,
        initialValue
      );
    }

    let setDirty = false;
    if (!isInitialized(field.name) && typeof field.defaultValue !== 'undefined' && typeof get(state.values, field.name) === 'undefined') {
      set(state.values, field.name, field.defaultValue);
      setDirty = true;
    }

    return setDirty;
  }

  function registerField(field: FieldConfig): void {
    isSilent = field.silent ? isSilent + 1 : isSilent;
    registeringField = field.internalId || field.name;
    field.silent && registeringFields.push(field.name);
    batch(() => {
      const render = prepareRerender();
      addIfUnique(state.registeredFields, field.name);

      let setDirty = initializeFieldValue(field);

      subscribe(field as SubscriberConfig, true);

      if (state.fieldListeners[field.name]?.count === 1) {
        const updateFieldValidating = (validating: boolean) => {
          state.fieldListeners[field.name].state.meta.validating = validating;
        };

        const fieldAsyncWatcher = asyncWatcher(updateFieldValidating, () => undefined, updateRunningValidators);
        state.fieldListeners[field.name].asyncWatcher = fieldAsyncWatcher;
      }

      if (field.data) {
        merge(state.fieldListeners[field.name].state.meta.data, field.data);
      }

      if (setDirty) {
        state.pristine = false;
        state.dirty = true;
        state.dirtyFields[field.name] = true;
        state.fieldListeners[field.name].state.meta.dirty = true;
        state.fieldListeners[field.name].state.meta.pristine = false;
      }

      if (!field.silent) {
        revalidateFields([
          field.name,
          ...(state.fieldListeners[field.name]?.validateFields || state.registeredFields.filter((n) => n !== field.name))
        ]);
        if (config.validate) {
          validateForm(config.validate);
        }
      }

      render();
    });
    isSilent = field.silent ? Math.min(isSilent - 1, 0) : isSilent;
    registeringField = undefined;
  }

  function afterSilentRegistration(field: Omit<FieldConfig, 'render'>) {
    registeringFields.splice(registeringFields.indexOf(field.name), 1);

    if (isSilent === 0 && silentRender.length > 0) {
      revalidateFields([field.name, ...(state.fieldListeners[field.name]?.validateFields || state.registeredFields.filter((n) => n !== field.name))]);

      if (config.validate) {
        validateForm(config.validate);
      }

      registeringField = field.internalId || field.name;
      rerender(silentRender);
      silentRender = [];
      registeringField = undefined;
    }
  }

  function unregisterField(field: Omit<FieldConfig, 'render'>): void {
    batch(() => {
      const render = prepareRerender();
      delete state.fieldListeners[field.name].fields[field.internalId];

      if (isLast(state.fieldListeners, field.name, registeringFields)) {
        state.registeredFields = state.registeredFields.filter((fieldName: string) => fieldName !== field.name);
        if (shouldExecute(config.clearOnUnmount || config.destroyOnUnregister, field.clearOnUnmount)) {
          set(state.values, field.name, field.value);
        }

        updateError(field.name);
      }

      unsubscribe(field as SubscriberConfig);

      revalidateFields(state.registeredFields);

      if (config.validate) {
        validateForm(config.validate);
      }

      render();
    });
  }

  function setFieldState(name: string, mutateState: (prevState: FieldState) => FieldState, dryRun = false): void {
    if (state.fieldListeners[name]) {
      const newState = mutateState(state.fieldListeners[name].state);
      state.fieldListeners[name].state = newState;
      !dryRun && Object.values(state.fieldListeners[name].fields).forEach(({ render }) => render());
    }
  }

  function getFieldValue(name: string): any {
    return get(state.values, name);
  }

  function getFieldState(name: string): ExtendedFieldState | undefined {
    if (state.fieldListeners[name]?.state) {
      const fieldState = cloneDeep(state.fieldListeners[name].state);
      return {
        ...fieldState,
        ...fieldState.meta,
        change: (value: any) => change(name, value),
        blur: () => change(name),
        focus: () => change(name)
      };
    }

    return;
  }

  function getState(): ManagerState {
    return { ...state, values: { ...state.values } };
  }

  function updateValidating(validating: boolean) {
    if (state.validating !== validating) {
      state.validating = validating;
      rerender(['validating']);
    }
  }

  function updateSubmitting(submitting: boolean) {
    if (state.submitting !== submitting) {
      state.submitting = submitting;
      rerender(['submitting']);
    }
  }

  function updateError(name: string, error: string | undefined = undefined): void {
    const render = prepareRerender();
    if (error) {
      set(state.errors, name, error);
      flatErrors[name] = error;
      state.valid = false;
      state.invalid = true;
      state.hasValidationErrors = true;
    } else {
      set(state.errors, name, undefined);
      delete flatErrors[name];
    }

    if (Object.keys(flatErrors).length === 0) {
      state.valid = true;
      state.invalid = false;
      state.hasValidationErrors = false;
    }

    render();
  }

  function registerAsyncValidator(validator: Promise<unknown>) {
    asyncWatcherApi.registerValidator(validator);
  }

  function updateValid(valid: boolean) {
    if (state.valid !== valid) {
      state.valid = valid;
      state.invalid = !valid;
      rerender(['valid', 'invalid']);
    }
  }

  function rerender(subscribeTo?: Array<string>) {
    if (inBatch > 0) {
      subscribeTo && subscribeTo.forEach((to) => addIfUnique(batched, to));
      shouldRerender = true;
    } else {
      if (config.subscription) {
        let refreshForm: boolean | undefined = false;

        traverseObject(config.subscription, (subscribed, key) => {
          if (!refreshForm) {
            refreshForm = subscribed && (key === 'all' || subscribeTo?.includes(key));
          }
        });

        if (refreshForm) {
          const formField = Object.values(state.fieldListeners)?.find((fieldListener: FieldListener) => fieldListener.isForm)?.fields[0];

          if (formField) {
            formField.render();
            return;
          }
        }
      }

      traverseObject(state.fieldListeners, (fieldListener) => {
        traverseObject(fieldListener.fields, (field, key) => {
          if (String(registeringField) !== String(key)) {
            let shouldRender: boolean | undefined = false;

            if (!config.subscription && !field.subscription) {
              shouldRender = true;
            } else if (field.subscription) {
              traverseObject(field.subscription, (subscribed, key) => {
                if (!shouldRender) {
                  shouldRender = subscribed && (key === 'all' || subscribeTo?.includes(key));
                }
              });
            }

            shouldRender && field.render();
          }
        });
      });
    }

    config.debug && config.debug(state);
  }

  function batch(callback: Callback): void {
    inBatch = inBatch + 1;
    callback();
    inBatch = inBatch - 1;
    if (inBatch === 0) {
      shouldRerender && rerender(batched);
      batched = [];
      shouldRerender = false;
    }
  }

  function subscribe(subscriberConfig: SubscriberConfig, isField?: boolean, isForm?: boolean): void {
    state.fieldListeners[subscriberConfig.name] = {
      ...state.fieldListeners[subscriberConfig.name],
      ...(isField
        ? {
          state:
            state.fieldListeners[subscriberConfig.name]?.state ||
            createField(String(subscriberConfig.name), get(state.values, subscriberConfig.name))
        }
        : {}),
      count: (state.fieldListeners[subscriberConfig.name]?.count || 0) + 1,
      validateFields: subscriberConfig.validateFields,
      fields: {
        ...state.fieldListeners[subscriberConfig.name]?.fields,
        [subscriberConfig.internalId || subscriberConfig.name]: {
          validate: subscriberConfig.validate,
          render: subscriberConfig.render,
          subscription: subscriberConfig.subscription,
          afterSubmit: subscriberConfig.afterSubmit,
          beforeSubmit: subscriberConfig.beforeSubmit,
          isEqual: subscriberConfig.isEqual
        }
      },
      ...(isForm && { isForm: true })
    };
  }

  function unsubscribe(subscriberConfig: Omit<SubscriberConfig, 'render'>): void {
    if (
      isLast(state.fieldListeners, String(subscriberConfig.name), registeringFields) &&
      noState(state.fieldListeners, String(subscriberConfig.name))
    ) {
      delete state.fieldListeners[subscriberConfig.name];
    } else {
      state.fieldListeners[subscriberConfig.name].count = state.fieldListeners[subscriberConfig.name].count - 1;
      delete state.fieldListeners[subscriberConfig.name].fields[subscriberConfig.internalId || subscriberConfig.name];
    }
  }

  function resetFieldState(name: string): void {
    batch(() => {
      const render = prepareRerender();
      // TODO: have initialValue and initialValues in one place
      const initialValue = get(state.initialValues, name) || state.fieldListeners[name].state.meta.initial;
      state.fieldListeners[name].state = createField(name, initialValue);

      set(state.values, name, initialValue);
      state.visited[name] = false;
      state.modified[name] = false;
      state.dirtyFields[name] = false;
      state.dirtyFieldsSinceLastSubmit[name] = false;

      render();
    });
  }

  function registerInputFile(name: string): void {
    state.fileInputs.push(name);
  }

  function unregisterInputFile(name: string): void {
    state.fileInputs.splice(state.fileInputs.indexOf(name), 1);
  }

  function getRegisteredFields(): Array<string> {
    return [...state.registeredFields];
  }

  function updateFieldConfig(field: UpdatedConfig): void {
    const { name, internalId, validate } = field;

    state.fieldListeners[name].fields[internalId] = {
      ...state.fieldListeners[name].fields[internalId],
      validate
    };

    const render = prepareRerender();

    let setDirty = initializeFieldValue(field);

    if (setDirty) {
      state.pristine = false;
      state.dirty = true;
      state.dirtyFields[field.name] = true;
      state.fieldListeners[field.name].state.meta.dirty = true;
      state.fieldListeners[field.name].state.meta.pristine = false;
    }

    setFieldState(name, (prev: FieldState) => ({
      ...prev,
      value: get(state.values, name),
      ...(Object.prototype.hasOwnProperty.call(field, 'initialValue') && {
        meta: {
          ...prev.meta,
          initial: field.initialValue
        }
      })
    }));

    revalidateFields([field.name, ...(state.fieldListeners[field.name]?.validateFields || state.registeredFields.filter((n) => n !== field.name))]);
    if (config.validate) {
      validateForm(config.validate);
    }

    render();
  }

  return managerApi;
};

export default createManagerApi;
