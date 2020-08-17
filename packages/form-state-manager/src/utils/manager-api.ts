import { FormEvent } from 'react';
import set from 'lodash/set';

import CreateManagerApi, { ManagerState, ManagerApi, AsyncWatcher, AsyncWatcherRecord, UpdateFieldState, FieldState } from '../types/manager-api';
import AnyObject from '../types/any-object';
import FieldConfig from '../types/field-config';
import { formLevelValidator } from './validate';

const isLast = (fieldListeners: AnyObject, name: string) => fieldListeners?.[name]?.count === 1;

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

const createManagerApi: CreateManagerApi = ({ onSubmit, clearOnUnmount, initializeOnMount, validate, subscription, initialValues }) => {
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
    initializeOnMount,
    initializedFields: []
  };

  const asyncWatcherApi = asyncWatcher(updateValidating, updateSubmitting);

  const managerApi: ManagerApi = () => state;

  function change(name: string, value?: any): void {
    state.values[name] = value;
    state.visited[name] = true;
    state.modified[name] = true;
    state.modifiedSinceLastSubmit = true;
    state.dirtySinceLastSubmit = true;
    state.dirtyFields[name] = true;
    state.dirtyFieldsSinceLastSubmit[name] = true;

    // TODO modify all affected field state variables
    setFieldState(name, (prevState) => ({ ...prevState, value }));
    state.pristine = false;

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

  function registerField(field: FieldConfig): void {
    addIfUnique(state.registeredFields, field.name);
    addIfUnique(state.initializedFields, field.name);

    state.fieldListeners[field.name] = {
      ...state.fieldListeners[field.name],
      state: field.state,
      count: (state.fieldListeners[field.name]?.count || 0) + 1,
      fields: {
        ...state.fieldListeners[field.name]?.fields,
        [field.internalId]: {
          render: field.render,
          subscription: field.subscription
        }
      }
    };

    // TODO: initial only first time -> have field states in global?
    if (shouldExecute(initializeOnMount, field.initializeOnMount) || !Object.prototype.hasOwnProperty.call(state.values, field.name)) {
      state.values[field.name] = field.value;
    }
  }

  function unregisterField(field: Omit<FieldConfig, 'render'>): void {
    delete state.fieldListeners[field.name].fields[field.internalId];

    if (isLast(state.fieldListeners, field.name)) {
      state.registeredFields = state.registeredFields.filter((fieldName: string) => fieldName !== field.name);
      delete state.fieldListeners[field.name];

      if (shouldExecute(clearOnUnmount, field.clearOnUnmount)) {
        state.values[field.name] = field.value;
      }
    } else {
      state.fieldListeners[field.name].count -= 1;
    }
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
      return state.fieldListeners[name].state;
    }
  }

  function getState(): AnyObject {
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

  return managerApi;
};

export default createManagerApi;
