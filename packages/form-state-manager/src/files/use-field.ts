import { useEffect, useContext, useReducer, useState } from 'react';
import FormManagerContext from '../files/form-manager-context';
import UseField, { OnChangeEvent, UseFieldData } from '../types/use-field';
import isEmpty from 'lodash/isEmpty';

import convertType from '../utils/convert-type';
import generateId from '../utils/generate-id';

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

const useField = ({ name, initialValue, clearOnUnmount, initializeOnMount, validate, subscription, dataType, ...props }: UseField): UseFieldData => {
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
      validate,
      subscription,
      internalId
    });

    return internalId;
  });
  const state = formOptions().getFieldState(name);

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

  return {
    input: {
      value: formOptions().getFieldValue(name) || '',
      onChange,
      onFocus: () => focus(name),
      onBlur: () => blur(name),
      name
    },
    meta: state!.meta,
    ...props
  };
};

export default useField;
