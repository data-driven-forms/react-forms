import React, { useReducer, FormEvent } from 'react';

import FormManagerContext, { Action } from './form-manager-context';
import stateManagerReducer, { initialState, REGISTER_FIELD, UNREGISTER_FIELD } from '../utils/state-manager-reducer';
import getFormValues from '../utils/get-form-values';
import AnyObject from '../types/any-object';

const registerField = (dispatch: (action: Action) => void, field: AnyObject) => dispatch({ type: REGISTER_FIELD, ...field });
const unRegisterField = (dispatch: (action: Action) => void, field: AnyObject) => dispatch({ type: UNREGISTER_FIELD, ...field });

export interface FormStateManagerProps {
  onSubmit: (values: AnyObject) => void;
  children: ((props: AnyObject) => React.ReactNode);
}

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
