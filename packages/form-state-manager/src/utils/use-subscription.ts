import { useEffect, useContext, useReducer, useState } from 'react';
import FormManagerContext from '../files/form-manager-context';
import UseSubscription, { OnChangeEvent, SubscribtionData, Meta } from '../types/use-subscription';
import { fieldLevelValidator, isPromise } from './validate';
import isEmpty from 'lodash/isEmpty';
import convertType from './convert-type';
import { FieldState } from '../types/manager-api';

const generateId = () => Date.now() + Math.round(Math.random() * 100000);

const sanitizeValue = (event: OnChangeEvent): any => {
  if (Array.isArray(event)) {
    return event;
  }

  if (typeof event === 'object' && Object.prototype.hasOwnProperty.call(event, 'target')) {
    if (event?.target === null) {
      return event;
    }

    return event?.target.type === 'checkbox' ? event.target.checked : event?.target.value;
  }

  return event;
};

/**
 * Checks the value and returns undefined if its empty. Converts epmty strings, arrays and objects.
 * If value is empty its overriden to undefined for further processing.
 * @param {Any} value Any JS variable to be check if is empty
 */
export const checkEmpty = (value: any) => {
  if (typeof value === 'number') {
    return false;
  }

  if (typeof value === 'boolean') {
    return false;
  }

  if (typeof value === 'string' && value.length > 0) {
    return false;
  }

  return isEmpty(value);
};

const useSubscription = ({
  name,
  initialValue,
  clearOnUnmount,
  initializeOnMount,
  validate,
  subscription,
  dataType,
  ...props
}: UseSubscription): SubscribtionData => {
  const { registerField, unregisterField, change, getFieldValue, blur, focus, formOptions, initialValues = {}, ...rest } = useContext(
    FormManagerContext
  );
  const [, render] = useReducer((count) => count + 1, 0);
  const [id] = useState(() => {
    const internalId = generateId();

    registerField({
      name,
      value: initialValue,
      initializeOnMount,
      render,
      subscription,
      internalId
    });

    return internalId;
  });
  const state = formOptions().getFieldState(name);
  const setState = (mutateState: (prevState: FieldState) => FieldState) => formOptions().setFieldState(name, mutateState);

  const handleError = (isValid: boolean, error: string | undefined = undefined): void => {
    setState((prev: FieldState) => ({
      ...prev,
      meta: {
        ...prev.meta,
        error,
        valid: isValid,
        invalid: !isValid,
        validating: false
      }
    }));

    // TODO lift error handling to manager API to avoid multiple re-renders
    formOptions().updateError(name, isValid ? undefined : error);
  };

  const finalClearedValue = Object.prototype.hasOwnProperty.call(props, 'clearedValue') ? props.clearedValue : rest.clearedValue;

  const handleChange = (event: OnChangeEvent) => {
    let sanitizedValue = sanitizeValue(event);

    const hasClearedValue = Object.prototype.hasOwnProperty.call(props, 'clearedValue') || Object.prototype.hasOwnProperty.call(rest, 'clearedValue');

    if (dataType) {
      sanitizedValue = Array.isArray(sanitizedValue)
        ? sanitizedValue.map((item) => convertType(dataType, sanitizeValue(item)))
        : convertType(dataType, sanitizedValue);
    }

    if (hasClearedValue && checkEmpty(sanitizedValue) && typeof state?.meta.initial === 'undefined') {
      sanitizedValue = finalClearedValue;
    }

    change(name, sanitizedValue);
    // TODO Memoize validation results
    if (validate) {
      const error = fieldLevelValidator(validate, sanitizedValue, formOptions().values, formOptions);
      if (isPromise(error)) {
        setState((prevState: FieldState) => ({ ...prevState, meta: { ...prevState.meta, validating: true } }));
        const asyncError = error as Promise<string | undefined>;
        asyncError.then(() => handleError(true)).catch((error) => handleError(false, error));
      } else {
        const syncError = error as string | undefined;
        if (error) {
          handleError(false, syncError);
        } else if (state?.meta.valid === false) {
          handleError(true);
        }
      }
    }

    setState((prevState: FieldState) => ({ ...prevState, value: getFieldValue(name) }));
  };

  useEffect(
    () => () => {
      unregisterField({ name, clearOnUnmount, internalId: id, value: finalClearedValue });
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const onChange = (event: OnChangeEvent) => {
    try {
      event.persist();
      handleChange(event);
    } catch {
      handleChange(event);
    }
  };

  return [formOptions().getFieldValue(name), onChange, () => focus(name), () => blur(name), state?.meta];
};

export default useSubscription;
