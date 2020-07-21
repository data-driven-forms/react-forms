import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import FormManagerContext from './form-manager-context';
import stateManagerReducer, { initialState, REGISTER_FIELD, UNREGISTER_FIELD } from '../utils/state-manager-reducer';
import getFormValues from '../utils/get-form-values';

const registerField = (dispatch, field) => dispatch({ type: REGISTER_FIELD, ...field });
const unRegisterField = (dispatch, field) => dispatch({ type: UNREGISTER_FIELD, ...field });

const FormStateManager = ({ children, onSubmit }) => {
  const [state, dispatch] = useReducer(stateManagerReducer, initialState);
  const handleSubmit = (event) => {
    event.preventDefault();
    return onSubmit(getFormValues(state));
  };

  console.log({ state });

  return (
    <FormManagerContext.Provider value={{ values: state.values, dispatch, handleSubmit, registerField, unRegisterField }}>
      <FormManagerContext.Consumer>{(state) => children(state)}</FormManagerContext.Consumer>
    </FormManagerContext.Provider>
  );
};

FormStateManager.propTypes = {
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default FormStateManager;
