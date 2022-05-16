import { useEffect, useContext, useReducer, useState, useRef } from 'react';
import FormManagerContext from '../form-manager-context';
import isEmpty from 'lodash/isEmpty';
import { Validator } from '../validate';

import generateId from '../generate-id';
import convertValue from '../convert-value';
import AnyObject from '../any-object';
import { DataType } from '../data-types';
import { AfterSubmit, BeforeSubmit } from '../field-config';

export interface Subscription {
  active?: boolean;
  dirty?: boolean;
  dirtySinceLastSubmit?: boolean;
  invalid?: boolean;
  modified?: boolean;
  modifiedSinceLastSubmit?: boolean;
  pristine?: boolean;
  submitFailed?: boolean;
  submitting?: boolean;
  touched?: boolean;
  valid?: boolean;
  validating?: boolean;
  values?: boolean;
  visited?: boolean;
  all?: boolean;
}

export interface Meta {
  active: boolean;
  data: any;
  dirty: boolean;
  dirtySinceLastSubmit: boolean;
  error: any;
  initial: any;
  invalid: boolean;
  modified: boolean;
  modifiedSinceLastSubmit: boolean;
  pristine: boolean;
  submitError: any;
  submitFailed: boolean;
  submitSucceeded: boolean;
  submitting: boolean;
  touched: boolean;
  valid: boolean;
  validating: boolean;
  visited: boolean;
  warning: any;
}

export type OnChange = (value: any) => void;
export type OnBlur = (value: any) => void;
export type OnFocus = (value: any) => void;

export interface Input {
  name: string;
  value: any;
  checked?: boolean;
  onChange: OnChange;
  onBlur: OnBlur;
  onFocus: OnFocus;
  multiple?: boolean;
  type?: string;
}

export type OnChangeEvent = React.ChangeEvent | any;

export interface UseFieldData extends AnyObject {
  input: Input;
  meta: Meta;
}

export type Format = (value: any, name: string) => any;
export type Parse = (value: any, name: string) => any;

export interface UseFieldConfig extends AnyObject {
  name: string;
  initialValue?: any;
  subscription?: Subscription;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  validate?: Validator;
  clearedValue?: any;
  dataType?: DataType;
  type?: string;
  format?: Format;
  parse?: Parse;
  formatOnBlur?: boolean;
  afterSubmit?: AfterSubmit;
  beforeSubmit?: BeforeSubmit;
  allowNull?: boolean;
  silent?: boolean;
}

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
}: UseFieldConfig): UseFieldData => {
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
      render: render as () => void,
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
        sanitizedValue = sanitizedValue ? [finalValue] : [];
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

  const { initialValue, clearedValue, isEqual, ...clearedProps } = props;

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
