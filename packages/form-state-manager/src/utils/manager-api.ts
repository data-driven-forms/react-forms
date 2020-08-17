import { FormEvent } from 'react';
import set from 'lodash/set';

import CreateManagerApi, {
  ManagerState,
  ManagerApi,
  AsyncWatcher,
  AsyncWatcherRecord,
  FieldState,
  Callback,
  SubscriberConfig
} from '../types/manager-api';
import AnyObject from '../types/any-object';
import FieldConfig from '../types/field-config';
import { Meta } from '../types/use-subscription';
import get from 'lodash/get';
import { formLevelValidator, isPromise } from './validate';

const isLast = (fieldListeners: AnyObject, name: string) => fieldListeners?.[name]?.count === 1;

const noState = (fieldListeners: AnyObject, name: string) => !fieldListeners?.[name]?.state;

const addIfUnique = (array: Array<string>, item: string) => !array.includes(item) && array.push(item);

export const shouldExecute = (formLevel: boolean | undefined, fieldLevel: boolean | undefined): boolean =>
  Boolean((formLevel || fieldLevel) && fieldLevel !== false);

type objectMapFunction = (value: any, key: any) => any;

// TODO: try to optimize
const traverseObject = (object: AnyObject, callback: objectMapFunction) => Object.keys(object).forEach((key) => callback(object[key], key));

const asyncWatcher: AsyncWatcher = (updateValidating, updateSubmitting) => {
  let nextKey = 0;
  const asyncValidators: AsyncWatcherRecord = {};
  const asyncSubmissions: AsyncWatcherRecord = {};

  const resolveValidator = (resolveKey: number): void => {
    delete asyncValidators[resolveKey];
    updateValidating(Object.keys(asyncValidators).length !== 0);
  };

  const registerValidator = (callback: Promise<unknown>) => {
    const resolveKey = nextKey;
    asyncValidators[nextKey] = callback;
    updateValidating(Object.keys(asyncValidators).length !== 0);
    callback.then(() => resolveValidator(resolveKey)).catch(() => resolveValidator(resolveKey));
    nextKey = nextKey + 1;
  };

  return {
    registerValidator
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
  visited: false
});

const createField = (field: FieldConfig, value: any): FieldState => ({
  name: field.name,
  value,
  meta: initialMeta(value)
});

const createManagerApi: CreateManagerApi = ({ onSubmit, clearOnUnmount, initializeOnMount, validate, subscription, initialValues, debug }) => {
  const state: ManagerState = {
    values: initialValues ? flatObject(initialValues) : {},
    errors: {},
    pristine: true,
    change,
    focus,
    blur,
    handleSubmit,
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
    initialValues: initialValues || {},
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
    initializeOnMount
  };
  let inBatch = 0;
  let batched: Array<string> = [];
  let shouldRerender = false;

  const asyncWatcherApi = asyncWatcher(updateValidating, updateSubmitting);

  const managerApi: ManagerApi = () => state;

  function handleFieldError(name: string, isValid: boolean, error: string | undefined = undefined) {
    setFieldState(name, (prev: FieldState) => ({
      ...prev,
      meta: {
        ...prev.meta,
        error,
        valid: isValid,
        invalid: !isValid,
        validating: false
      }
    }));

    updateError(name, isValid ? undefined : error);
  }

  function validateField(name: string, value: any) {
    // TODO Memoize validation results
    if (Object.prototype.hasOwnProperty.call(state.fieldListeners, name) && typeof state.fieldListeners[name].validate === 'function') {
      const listener = state.fieldListeners[name].asyncWatcher;
      const result = state.fieldListeners[name].validate!(value, state.values);
      if (isPromise(result)) {
        const asyncResult = result as Promise<string | undefined>;
        listener.registerValidator(asyncResult);
        return asyncResult.then(() => handleFieldError(name, true)).catch((error) => handleFieldError(name, false, error));
      }

      const syncError = result as string | undefined;
      const { valid, validating } = state.fieldListeners[name].state.meta;
      if (result) {
        handleFieldError(name, false, syncError);
      } else if (valid === false && validating === false) {
        handleFieldError(name, true);
      }
    }
  }

  function change(name: string, value?: any): void {
    state.values[name] = value;
    state.visited[name] = true;
    state.modified[name] = true;
    state.modifiedSinceLastSubmit = true;
    state.dirtySinceLastSubmit = true;
    state.dirtyFields[name] = true;
    state.dirtyFieldsSinceLastSubmit[name] = true;

    // TODO modify all affected field state variables
    batch(() => {
      setFieldState(name, (prevState) => ({ ...prevState, value }));
      state.pristine = false;
      validateField(name, value);
    });

    if (validate) {
      formLevelValidator(validate, state.values, managerApi);
    }
  }

  function focus(name: string): void {
    state.active = name;
  }

  function blur(name: string): void {
    if (state.active === name) {
      state.active = undefined;
    }
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    onSubmit(unFlatObject(state.values));
  }

  function isInitialized(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(state.fieldListeners, name);
  }

  function registerField(field: FieldConfig): void {
    addIfUnique(state.registeredFields, field.name);

    if (shouldExecute(initializeOnMount, field.initializeOnMount) || !isInitialized(field.name)) {
      state.values[field.name] = field.value || get(state.initialValues, field.name);
    }

    subscribe(field as SubscriberConfig, true);

    if (state.fieldListeners[field.name]?.count === 1) {
      const updateFieldValidating = (validating: boolean) => {
        state.fieldListeners[field.name].state.meta.validating = validating;
      };

      const fieldAsyncWatcher = asyncWatcher(updateFieldValidating, () => undefined);
      state.fieldListeners[field.name].asyncWatcher = fieldAsyncWatcher;
    }
  }

  function unregisterField(field: Omit<FieldConfig, 'render'>): void {
    delete state.fieldListeners[field.name].fields[field.internalId];

    if (isLast(state.fieldListeners, field.name)) {
      state.registeredFields = state.registeredFields.filter((fieldName: string) => fieldName !== field.name);
      if (shouldExecute(clearOnUnmount, field.clearOnUnmount)) {
        state.values[field.name] = field.value;
      }
    }

    unsubscribe(field as SubscriberConfig);
  }

  function setFieldState(name: string, mutateState: (prevState: FieldState) => FieldState): void {
    if (state.fieldListeners[name]) {
      const newState = mutateState(state.fieldListeners[name].state);
      state.fieldListeners[name].state = newState;
      Object.values(state.fieldListeners[name].fields).forEach(({ render }) => render());
    }
  }

  function getFieldValue(name: string): any {
    return state.values[name];
  }

  function getFieldState(name: string): AnyObject | undefined {
    if (state.fieldListeners[name]) {
      return {
        ...state.fieldListeners[name].state,
        ...state.fieldListeners[name].state.meta,
        change: (value: any) => change(name, value),
        blur: () => change(name),
        focus: () => change(name)
      };
    }
  }

  function getState(): ManagerState {
    return {
      ...state,
      values: unFlatObject(state.values)
    };
  }

  function updateValidating(validating: boolean) {
    state.validating = validating;
  }

  function updateSubmitting(submitting: boolean) {
    state.submitting = submitting;
  }

  function updateError(name: string, error: string | undefined = undefined): void {
    state.errors[name] = error;
  }

  function registerAsyncValidator(validator: Promise<unknown>) {
    asyncWatcherApi.registerValidator(validator);
  }

  function updateValid(valid: boolean) {
    state.valid = valid;
    state.invalid = !valid;
  }

  function rerender(subscribeTo?: Array<string>) {
    if (inBatch > 0) {
      subscribeTo && subscribeTo.forEach((to) => addIfUnique(batched, to));
      shouldRerender = true;
    } else {
      traverseObject(state.fieldListeners, (fieldListener) => {
        traverseObject(fieldListener.fields, (field) => {
          let shouldRender: boolean | undefined = false;

          const mergedSubscription = { ...subscription, ...field.subscription };

          if (!subscription && !field.subscription) {
            shouldRender = true;
          } else {
            traverseObject(mergedSubscription, (subscribed, key) => {
              if (!shouldRender) {
                shouldRender = subscribed && subscribeTo?.includes(key);
              }
            });
          }

          shouldRender && field.render();
        });
      });
    }

    debug &&
      debug({
        ...state,
        values: unFlatObject(state.values)
      });
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

  function subscribe(subscriberConfig: SubscriberConfig, isField?: boolean): void {
    state.fieldListeners[subscriberConfig.name] = {
      ...state.fieldListeners[subscriberConfig.name],
      ...(isField
        ? {
            state:
              state.fieldListeners[subscriberConfig.name]?.state || createField(subscriberConfig as FieldConfig, state.values[subscriberConfig.name])
          }
        : {}),
      count: (state.fieldListeners[subscriberConfig.name]?.count || 0) + 1,
      validate: subscriberConfig.validate,
      fields: {
        ...state.fieldListeners[subscriberConfig.name]?.fields,
        [subscriberConfig.internalId || subscriberConfig.name]: {
          render: subscriberConfig.render,
          subscription: subscriberConfig.subscription
        }
      }
    };
  }

  function unsubscribe(subscriberConfig: Omit<SubscriberConfig, 'render'>): void {
    if (isLast(state.fieldListeners, String(subscriberConfig.name)) && noState(state.fieldListeners, String(subscriberConfig.name))) {
      delete state.fieldListeners[subscriberConfig.name];
    } else {
      state.fieldListeners[subscriberConfig.name].count = state.fieldListeners[subscriberConfig.name].count - 1;
      delete state.fieldListeners[subscriberConfig.name].fields[subscriberConfig.internalId || subscriberConfig.name];
    }
  }

  return managerApi;
};

export default createManagerApi;
