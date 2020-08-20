import React, { useRef } from 'react';

import FormManagerContext from './form-manager-context';
import createManagerApi from '../utils/manager-api';

import FormStateManagerProps from '../types/form-state-manager';
import useFieldArrayApi from './use-field-array-api';

const FormStateManager: React.ComponentType<FormStateManagerProps> = ({
  children,
  onSubmit,
  clearOnUnmount,
  subscription,
  clearedValue,
  initialValues,
  initializeOnMount,
  validate,
  debug
}) => {
  const { current: managerApi } = useRef(
    createManagerApi({ onSubmit, clearOnUnmount, validate, subscription, initialValues, initializeOnMount, debug })
  );

  const {
    batch,
    change,
    handleSubmit,
    registerField,
    unregisterField,
    getState,
    getFieldValue,
    getFieldState,
    blur,
    focus,
    subscribe,
    unsubscribe
  } = managerApi();

  const { current: fieldArrayApi } = useRef(useFieldArrayApi(change, getFieldValue));
  return (
    <FormManagerContext.Provider
      value={{
        batch,
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
        clearedValue,
        initialValues,
        subscribe,
        unsubscribe,
        ...fieldArrayApi
      }}
    >
      <FormManagerContext.Consumer>{(managerState) => children(managerState)}</FormManagerContext.Consumer>
    </FormManagerContext.Provider>
  );
};

export default FormStateManager;
