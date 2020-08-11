import { useEffect, useState, useContext, useRef, useReducer } from 'react';
import FormManagerContext from '../files/form-manager-context';
import UseSubscription, { OnChangeEvent, SubscribtionData, Meta } from '../types/use-subscription';
import AnyObject from '../types/any-object';
import { fieldLevelValidator, isPromise } from './validate';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import convertType from './convert-type';
import { shouldExecute } from './manager-api';

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

const createFieldState = (initialState: AnyObject) => {
  let state = initialState;
  const setDetachedState = (newState: AnyObject) => {
    state = newState;
  };

  const getDetachedState = (): AnyObject => state;
  return {
    setDetachedState,
    getDetachedState
  };
};

export const initialMeta = (initial: any): Meta => ({
  active: false,
  data: undefined,
  dirty: false,
  dirtySinceLastSubmit: false,
  error: undefined,
  initial,
  invalid: false,
  modified: false,
  modifiedSinceLastSubmit: false,
  pristine: true,
  submitError: undefined,
  submitFailed: false,
  submitSucceeded: false,
  submitting: false,
  touched: false,
  valid: true,
  validating: false,
  visited: false
});

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
  const [state, setState] = useState(() => {
    const values = formOptions().values;
    const firstinitialization = !Object.prototype.hasOwnProperty.call(values, name);
    const initValue = initialValue || get(initialValues, name);
    let value = get(values, name);

    if (firstinitialization || shouldExecute(formOptions().initializeOnMount, initializeOnMount)) {
      value = initValue;
    }

    return {
      value,
      name,
      meta: initialMeta(initValue),
      internalId: generateId()
    };
  });
  const {
    current: { getDetachedState, setDetachedState }
  } = useRef(createFieldState(state));
  const [, render] = useReducer((count) => count + 1, 0);

  /**
   * update detached state on each render
   */
  setDetachedState(state);

  const handleError = (isValid: boolean, error: string | undefined = undefined): void => {
    setState((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        error,
        valid: isValid,
        invalid: !isValid,
        validating: false
      }
    }));
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

    if (hasClearedValue && checkEmpty(sanitizedValue) && typeof state.meta.initial === 'undefined') {
      sanitizedValue = finalClearedValue;
    }

    change(name, sanitizedValue);
    // TODO Memoize validation results
    if (validate) {
      const error = fieldLevelValidator(validate, sanitizedValue, formOptions().values, formOptions);
      if (isPromise(error)) {
        setState((prevState) => ({ ...prevState, meta: { ...prevState.meta, validating: true } }));
        const asyncError = error as Promise<string | undefined>;
        asyncError.then(() => handleError(true)).catch((error) => handleError(false, error));
      } else {
        const syncError = error as string | undefined;
        if (error) {
          handleError(false, syncError);
        } else if (state.meta.valid === false) {
          handleError(true);
        }
      }
    }

    setState((prevState) => ({ ...prevState, value: getFieldValue(name) }));
  };

  const valueToReturn = state.value;

  useEffect(() => {
    registerField({
      name,
      value: state.value,
      getFieldState: getDetachedState,
      initializeOnMount,
      render,
      subscription,
      internalId: state.internalId
    });

    return () => {
      unregisterField({ name, clearOnUnmount, internalId: state.internalId, value: finalClearedValue });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (event: OnChangeEvent) => {
    try {
      event.persist();
      handleChange(event);
    } catch {
      handleChange(event);
    }
  };

  return [valueToReturn, onChange, () => focus(name), () => blur(name), state.meta];
};

export default useSubscription;
