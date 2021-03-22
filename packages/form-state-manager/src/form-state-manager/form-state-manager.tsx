import React, { useEffect, useReducer, useRef, useState } from 'react';

import FormManagerContext from '../form-manager-context';
import createManagerApi from '../manager-api';

import useFieldArrayApi from '../use-field-array-api';
import generateId from '../generate-id';
import AnyObject from '../any-object';
import { Subscription } from '../use-field';
import { FormValidator } from '../validate';
import { Debug } from '../manager-api';

export interface FormStateManagerProps {
  onSubmit: (values: AnyObject) => void;
  children?: (props: AnyObject) => React.ReactNode;
  render?: (props: AnyObject) => React.ReactNode;
  clearOnUnmount?: boolean;
  subscription?: Subscription;
  clearedValue?: any;
  initialValues?: AnyObject;
  initializeOnMount?: boolean;
  validate?: FormValidator;
  debug?: Debug;
}

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

    subscribe({ name: internalId, render: rerender as () => void, subscription }, false, true);

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
