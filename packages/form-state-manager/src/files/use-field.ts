import { useEffect, useContext, useReducer, useState } from 'react';
import FormManagerContext from '../files/form-manager-context';
import UseField, { OnChangeEvent, UseFieldData, Format } from '../types/use-field';
import isEmpty from 'lodash/isEmpty';

import convertType from '../utils/convert-type';
import generateId from '../utils/generate-id';

const checkboxTypes = ['checkbox', 'radio'];

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

const defaultFormat = (value?: any) => (value === undefined ? '' : value);
const defaultParse = (value?: any) => (value === '' ? undefined : value);

const useField = ({
  name,
  initialValue,
  clearOnUnmount,
  initializeOnMount,
  validate,
  subscription,
  dataType,
  type,
  multiple,
  value,
  defaultValue,
  format,
  parse = defaultParse,
  formatOnBlur,
  beforeSubmit,
  afterSubmit,
  ...props
}: UseField): UseFieldData => {
  const { registerField, unregisterField, change, getFieldValue, blur, focus, formOptions, ...rest } = useContext(FormManagerContext);
  const [, render] = useReducer((count) => count + 1, 0);
  const [id] = useState(() => {
    const internalId = generateId();

    registerField({
      name,
      initialValue,
      initializeOnMount,
      render,
      validate,
      subscription,
      internalId,
      defaultValue,
      beforeSubmit,
      afterSubmit
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

    if (type && type === 'checkbox') {
      if (value) {
        if (state?.value && Array.isArray(state.value)) {
          sanitizedValue = state.value.includes(value) ? state.value.filter((v: any) => v !== value) : [...state.value, value];
        } else {
          sanitizedValue = [value];
        }
      }
    }

    change(name, parse(sanitizedValue, name));
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

  let valueToReturn = formOptions().getFieldValue(name) || '';
  let checked;

  if (type === 'checkbox') {
    if (!value) {
      checked = !!valueToReturn;
    } else {
      checked = !!(Array.isArray(valueToReturn) && valueToReturn.includes(value));
    }
  } else if (type === 'radio') {
    checked = valueToReturn === value;
  }

  if (type && checkboxTypes.includes(type)) {
    valueToReturn = value;
  }

  let finalFormat = defaultFormat as Format;
  if ((format && !formatOnBlur) || (format && formatOnBlur && !state?.meta.active)) {
    finalFormat = format;
  }

  return {
    input: {
      value: finalFormat(valueToReturn, name),
      onChange,
      onFocus: () => focus(name),
      onBlur: () => blur(name),
      name,
      multiple,
      type,
      checked
    },
    meta: state!.meta,
    ...props
  };
};

export default useField;
