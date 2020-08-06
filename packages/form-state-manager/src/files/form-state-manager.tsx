import React, { useReducer, FormEvent } from 'react';

import FormManagerContext from './form-manager-context';
import stateManagerReducer, { initialState, REGISTER_FIELD, UNREGISTER_FIELD } from '../utils/state-manager-reducer';
import getFormValues from '../utils/get-form-values';

import AnyObject from '../types/any-object';
import FormStateManagerProps from '../types/form-state-manager';
import { Action } from '../types/form-manager-context';

const registerField = (dispatch: (action: Action) => void, field: AnyObject) => dispatch({ type: REGISTER_FIELD, ...field });
const unRegisterField = (dispatch: (action: Action) => void, field: AnyObject) => dispatch({ type: UNREGISTER_FIELD, ...field });

const FormStateManager: React.ComponentType<FormStateManagerProps> = ({ children, onSubmit }) => {
  const [state, dispatch] = useReducer(stateManagerReducer, initialState);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(getFormValues(state));
  };

  return (
    <FormManagerContext.Provider value={{ values: state.values, dispatch, handleSubmit, registerField, unRegisterField }}>
      <FormManagerContext.Consumer>{(managerState) => children(managerState)}</FormManagerContext.Consumer>
    </FormManagerContext.Provider>
  );
};

export default FormStateManager;
