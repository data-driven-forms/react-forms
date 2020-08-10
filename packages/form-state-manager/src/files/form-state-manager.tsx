import React, { useRef } from 'react';

import FormManagerContext from './form-manager-context';
import createManagerApi from '../utils/manager-api';

import FormStateManagerProps from '../types/form-state-manager';

const FormStateManager: React.ComponentType<FormStateManagerProps> = ({ children, onSubmit, clearOnUnmount, subscription, clearedValue }) => {
  const { current: managerApi } = useRef(createManagerApi({ onSubmit, clearOnUnmount, subscription }));

  const { change, handleSubmit, registerField, unregisterField, getState, getFieldValue, getFieldState, blur, focus } = managerApi();

  return (
    <FormManagerContext.Provider
      value={{
        blur,
        focus,
        getFieldState,
        getFieldValue,
        change,
        getState,
        handleSubmit,
        registerField,
        unregisterField,
        formOptions: managerApi,
        clearedValue
      }}
    >
      <FormManagerContext.Consumer>{(managerState) => children(managerState)}</FormManagerContext.Consumer>
    </FormManagerContext.Provider>
  );
};

export default FormStateManager;
