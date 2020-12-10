import { useEffect, useContext, useReducer, useState, useRef } from 'react';
import FormManagerContext from '../files/form-manager-context';
import UseField, { OnChangeEvent, UseFieldData, Format } from '../types/use-field';
import isEmpty from 'lodash/isEmpty';

import generateId from '../utils/generate-id';
import convertValue from '../utils/convert-value';

const checkboxTypes = ['checkbox', 'radio'];

const sanitizeValue = (event: OnChangeEvent): any => {
  if (Array.isArray(event)) {
    return event;
  }

  if (typeof event === 'object' && Object.prototype.hasOwnProperty.call(event, 'target')) {
    if (event?.target === null) {
      return event;
    }

    if (event.target.type === 'file') {
      return {
        inputValue: event.target.value,
        inputFiles: event.target.files
      };
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
  if (typeof value === 'object' && value instanceof Date) {
    return false;
  }

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
  allowNull,
  ...props
}: UseField): UseFieldData => {
  const { registerField, unregisterField, change, getFieldValue, blur, focus, formOptions, updateFieldConfig, ...rest } = useContext(
    FormManagerContext
  );
  const [, render] = useReducer((count) => count + 1, 0);
  const mounted = useRef(false);
  const [id] = useState(() => {
    const internalId = generateId();

    registerField({
      name,
      ...(Object.prototype.hasOwnProperty.call(props, 'initialValue') && {
        initialValue: dataType ? convertValue(props.initialValue, dataType) : props.initialValue
      }),
      initializeOnMount,
      render,
      validate,
      subscription,
      internalId,
      defaultValue: dataType ? convertValue(defaultValue, dataType) : defaultValue,
      beforeSubmit,
      afterSubmit,
      silent: true
    });

    return internalId;
  });
  const state = formOptions.getFieldState(name);

  const finalClearedValue = Object.prototype.hasOwnProperty.call(props, 'clearedValue') ? props.clearedValue : rest.clearedValue;

  const handleChange = (event: OnChangeEvent) => {
    let sanitizedValue = sanitizeValue(event);

    const hasClearedValue = Object.prototype.hasOwnProperty.call(props, 'clearedValue') || Object.prototype.hasOwnProperty.call(rest, 'clearedValue');

    if (dataType) {
      sanitizedValue = convertValue(sanitizedValue, dataType);
    }

    if (hasClearedValue && checkEmpty(sanitizedValue) && typeof state?.meta.initial === 'undefined') {
      sanitizedValue = finalClearedValue;
    }

    if ((type && type === 'checkbox' && value) || multiple) {
      const finalValue = value || sanitizedValue;

      if (state?.value && Array.isArray(state.value)) {
        sanitizedValue = state.value.includes(finalValue) ? state.value.filter((v: any) => v !== finalValue) : [...state.value, finalValue];
      } else {
        sanitizedValue = [finalValue];
      }
    }

    change(name, parse(sanitizedValue, name));
  };

  const validateToCheck = validate ? JSON.stringify(validate) : false;

  useEffect(() => {
    if (mounted.current) {
      updateFieldConfig({
        name,
        internalId: id,
        ...(Object.prototype.hasOwnProperty.call(props, 'initialValue') && {
          initialValue: dataType ? convertValue(props.initialValue, dataType) : props.initialValue
        }),
        defaultValue: dataType ? convertValue(defaultValue, dataType) : defaultValue,
        validate,
        initializeOnMount
      });
    }
  }, [dataType, validateToCheck, props.initialValue, defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => {
      formOptions.afterSilentRegistration({ name, internalId: id });

      if (type === 'file') {
        formOptions.registerInputFile(name);
      }

      mounted.current = true;

      return () => {
        if (type === 'file') {
          formOptions.unregisterInputFile(name);
        }

        unregisterField({ name, clearOnUnmount, internalId: id, value: finalClearedValue });
      };
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

  let valueToReturn = formOptions.getFieldValue(name);
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

  valueToReturn = finalFormat(valueToReturn, name);

  if ((valueToReturn === null && !allowNull) || (valueToReturn !== null && !valueToReturn)) {
    valueToReturn = '';
  }

  if (!valueToReturn && multiple) {
    valueToReturn = [];
  }

  if (type === 'file' && typeof valueToReturn === 'object') {
    valueToReturn = valueToReturn.inputValue;
  }

  const { initialValue, ...clearedProps } = props;

  return {
    input: {
      value: valueToReturn,
      onChange,
      onFocus: () => focus(name),
      onBlur: () => blur(name),
      name,
      multiple,
      type,
      checked
    },
    meta: state!.meta,
    ...clearedProps
  };
};

export default useField;
