import { FormEvent } from 'react';
import CreateManagerApi, { ManagerState, ManagerApi } from '../types/manager-api';

import AnyObject from '../types/any-object';
import FieldState from '../types/field-state';

const isLast = (fieldListeners: AnyObject, name: string) => fieldListeners?.[name]?.count === 1;

const createManagerApi: CreateManagerApi = (onSubmit) => {
  const state: ManagerState = {
    values: {},
    errors: {},
    pristine: true,
    change,
    handleSubmit,
    registerField,
    unregisterField,
    getState,
    registeredFields: [],
    fieldListeners: {}
  };
  function change(name: string, value?: any): any {
    state.values[name] = value;
  }

  const managerApi: ManagerApi = () => state;

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    onSubmit(state.values);
  }

  function registerField(field: FieldState): void {
    if (!state.registeredFields.includes(field.name)) {
      state.registeredFields = [...state.registeredFields, field.name];
    }

    state.fieldListeners[field.name] = {
      ...state.fieldListeners[field.name],
      count: (state.fieldListeners[field.name]?.count || 0) + 1,
      getFieldState: field.getFieldState
    };
  }

  function unregisterField(field: FieldState): void {
    if (isLast(state.fieldListeners, field.name)) {
      state.registeredFields = state.registeredFields.filter((fieldName: string) => fieldName !== field.name);
      delete state.fieldListeners[field.name];
    } else {
      state.fieldListeners[field.name].count -= 1;
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
