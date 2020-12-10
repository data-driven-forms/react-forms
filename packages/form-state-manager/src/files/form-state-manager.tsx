import React, { useEffect, useReducer, useRef, useState } from 'react';

import FormManagerContext from './form-manager-context';
import createManagerApi from '../utils/manager-api';

import FormStateManagerProps from '../types/form-state-manager';
import useFieldArrayApi from './use-field-array-api';
import generateId from '../utils/generate-id';

const FormStateManager: React.ComponentType<FormStateManagerProps> = ({
  children,
  onSubmit,
  clearOnUnmount,
  subscription,
  clearedValue,
  initialValues,
  initializeOnMount,
  validate,
  debug,
  render
}) => {
  const { current: managerApi } = useRef(
    createManagerApi({ onSubmit, clearOnUnmount, validate, subscription, initialValues, initializeOnMount, debug })
  );

  const { change, getFieldValue, subscribe, unsubscribe, pauseValidation, resumeValidation } = managerApi();

  const [, rerender] = useReducer((prev) => prev + 1, 0);

  const [id] = useState(() => {
    const internalId = generateId();

    pauseValidation();

    subscribe({ name: internalId, render: rerender, subscription }, false, true);

    return internalId;
  });

  useEffect(
    () => {
      resumeValidation();
      return () => {
        unsubscribe({ name: id });
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { current: fieldArrayApi } = useRef(useFieldArrayApi(change, getFieldValue));

  const managerState = {
    formOptions: managerApi(),
    clearedValue,
    ...managerApi().getState(),
    ...fieldArrayApi
  };

  const finalRender = render ? render : children;

  return (
    <FormManagerContext.Provider value={managerState}>
      <FormManagerContext.Consumer>{() => finalRender && finalRender(managerState)}</FormManagerContext.Consumer>
    </FormManagerContext.Provider>
  );
};

export default FormStateManager;
