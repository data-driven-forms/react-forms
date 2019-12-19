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
const convertType = (dataType, value) => ({
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
    return value;
  }

  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  if (!isEmpty(value)) {
    return value;
  }

  return undefined;
};

/**
 * Casts input value into selected data type
 * @param {FieldDataTypes} dataType intended data type of output value
 * @param {Function} onChange original function to be modified
 * @param {Any} initial initial value of field
 * @param {Any} value value to be type casted
 * @param  {...any} args rest of orininal function arguments
 */
const enhancedOnChange = (dataType, onChange, initial, deletedValue, value, ...args) => {
  const sanitizedValue = sanitizeValue(value);
  const result = Array.isArray(sanitizedValue)
    ? sanitizedValue.map(item => convertType(dataType, sanitizeValue(item)))
    : convertType(dataType, sanitizedValue);
  if (typeof checkEmpty(result) === 'undefined' && typeof initial !== 'undefined') {
    return onChange(deletedValue, ...args);
  }

  return onChange(result, ...args);
};

export default enhancedOnChange;
