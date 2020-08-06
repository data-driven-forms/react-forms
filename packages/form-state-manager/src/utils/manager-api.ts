import { FormEvent } from 'react';
import set from 'lodash/set';

import CreateManagerApi, { ManagerState, ManagerApi } from '../types/manager-api';
import AnyObject from '../types/any-object';
import FieldConfig from '../types/field-config';

const isLast = (fieldListeners: AnyObject, name: string) => fieldListeners?.[name]?.count === 1;

const addIfUnique = (array: Array<string>, item: string) => !array.includes(item) && array.push(item);

const createManagerApi: CreateManagerApi = (onSubmit) => {
  const state: ManagerState = {
    values: {},
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
    registeredFields: [],
    fieldListeners: {},
    active: undefined,
    dirty: false,
    dirtyFields: [],
    dirtyFieldsSinceLastSubmit: [],
    dirtySinceLastSubmit: false,
    error: null,
    hasSubmitErrors: false,
    hasValidationErrors: false,
    initialValues: {},
    invalid: false,
    modified: {},
    modifiedSinceLastSubmit: false,
    submitError: null,
    submitErrors: {},
    submitFailed: false,
    submitSucceeded: false,
    submitting: false,
    touched: {},
    valid: true,
    validating: false,
    visited: {}
  };
  function change(name: string, value?: any): void {
    state.values[name] = value;
    state.visited[name] = true;
    state.modified[name] = true;
    state.modifiedSinceLastSubmit = true;
    state.dirtySinceLastSubmit = true;

    addIfUnique(state.dirtyFields, name);
    addIfUnique(state.dirtyFieldsSinceLastSubmit, name);

    state.pristine = false;
  }

  function focus(name: string): void {
    state.active = name;
  }

  function blur(name: string): void {
    if (state.active === name) {
      state.active = undefined;
    }
  }

  const managerApi: ManagerApi = () => state;

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    const nestedStructure = {};
    Object.entries(state.values).forEach(([key, value]) => {
      set(nestedStructure, key, value);
    });
    onSubmit(nestedStructure);
  }

  function registerField(field: FieldConfig): void {
    addIfUnique(state.registeredFields, field.name);

    state.fieldListeners[field.name] = {
      ...state.fieldListeners[field.name],
      getFieldState: field.getFieldState,
      count: (state.fieldListeners[field.name]?.count || 0) + 1
    };
  }

  function unregisterField(field: FieldConfig): void {
    if (isLast(state.fieldListeners, field.name)) {
      state.registeredFields = state.registeredFields.filter((fieldName: string) => fieldName !== field.name);
      delete state.fieldListeners[field.name];
    } else {
      state.fieldListeners[field.name].count -= 1;
    }
  }

  function getFieldValue(name: string): any {
    return state.values[name];
  }

  function getFieldState(name: string): AnyObject | undefined {
    if (state.fieldListeners[name]) {
      return state.fieldListeners[name].getFieldState();
    }
  }

  function getState(): AnyObject {
    return {
      values: state.values,
      pristine: state.pristine,
      errors: state.errors
    };
  }

  return managerApi;
};

export default createManagerApi;
