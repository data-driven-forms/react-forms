import isEmpty from 'lodash/isEmpty';
import convertType from './convert-type';
import { DataType } from '../data-types';

export interface EnhancedOnChangeOptions {
  dataType?: DataType;
  onChange: (value: any) => void;
  initial?: any;
  clearedValue?: any;
  dirty?: boolean;
}

/**
 * Pick a value from event object and returns it
 * @param {Object|Any} event event value returned from form field
 */
const sanitizeValue = (event: any): any => {
  if (typeof event === 'object' && event !== null && event.target) {
    if (event.target.type === 'checkbox') {
      return event;
    }

    if (event.target.type === 'file') {
      return {
        inputValue: event.target.value,
        inputFiles: event.target.files,
      };
    }

    return event.target.value;
  }

  return event;
};

/**
 * Checks the value and returns undefined if its empty. Converst epmtry strings, arrays and objects.
 * If value is empty its overriden to undefined for further processing.
 * @param {Any} value Any JS variable to be check if is empty
 */
const checkEmpty = (value: any): boolean => {
  if (typeof value === 'number') {
    return false;
  }

  if (typeof value === 'boolean') {
    return false;
  }

  if (typeof value === 'string' && value.length > 0) {
    return false;
  }

  if (value instanceof Date) {
    return false;
  }

  if (!isEmpty(value)) {
    return false;
  }

  return true;
};

/**
 * Casts input value into selected data type
 */
const enhancedOnChange = ({ dataType, onChange, initial, clearedValue, dirty }: EnhancedOnChangeOptions, value: any, ...args: any[]): void => {
  const sanitizedValue = sanitizeValue(value);

  let result;
  if (typeof sanitizedValue == 'object' && sanitizedValue !== null && sanitizedValue.target && sanitizedValue.target.type === 'checkbox') {
    result = sanitizedValue;
  } else {
    result = Array.isArray(sanitizedValue)
      ? sanitizedValue.map((item) => convertType(dataType as any, sanitizeValue(item)))
      : convertType(dataType as any, sanitizedValue);
  }

  if (checkEmpty(result) && typeof initial !== 'undefined') {
    return onChange(clearedValue);
  }

  return onChange(result);
};

export default enhancedOnChange;