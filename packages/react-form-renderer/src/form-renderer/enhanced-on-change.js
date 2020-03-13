import isEmpty from 'lodash/isEmpty';
import { dataTypes } from '../constants';

/**
 * Pick a value from event object and returns it
 * @param {Object|Any} event event value returned from form field
 */
const sanitizeValue = event => {
  if (typeof event === 'object' && event !== null && event.target) {
    if (event.target.type === 'checkbox') {
      return event.target.checked;
    }

    return event.target.value;
  }

  return event;
};

/**
 * Casts string true/false to boolean
 * @param {String} value value
 */
const castToBoolean = value => {
  if (typeof value === 'boolean') {
    return value;
  }

  return value === 'true';
};

/**
 * Changes the value type
 * @param {FieldDataTypes} dataType type for value conversion
 * @param {Any} value value to be converted
 */
export const convertType = (dataType, value) => ({
  [dataTypes.INTEGER]: !isNaN(Number(value)) && parseInt(value),
  [dataTypes.FLOAT]: !isNaN(Number(value)) && parseFloat(value),
  [dataTypes.NUMBER]: Number(value),
  [dataTypes.BOOLEAN]: castToBoolean(value),
})[dataType] || value;

/**
 * Checks the value and returns undefined if its empty. Converst epmtry strings, arrays and objects.
 * If value is empty its overriden to undefined for further processing.
 * @param {Any} value Any JS variable to be check if is empty
 */
const checkEmpty = value => {
  if (typeof value === 'number') {
    return false;
  }

  if (typeof value === 'boolean') {
    return false;
  }

  if (typeof value === 'string' && value.length > 0) {
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
const enhancedOnChange = ({ dataType, onChange, initial, clearedValue, dirty, ...rest }, value, ...args) => {
  const sanitizedValue = sanitizeValue(value);
  const result = Array.isArray(sanitizedValue)
    ? sanitizedValue.map(item => convertType(dataType, sanitizeValue(item)))
    : convertType(dataType, sanitizedValue);
  if (checkEmpty(result) && typeof initial !== 'undefined') {
    return onChange(clearedValue, ...args);
  }

  return onChange(result, ...args);
};

export default enhancedOnChange;
