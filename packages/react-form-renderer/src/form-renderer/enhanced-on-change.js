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
 * Casts input value into selected data type
 * @param {FieldDataTypes} dataType intended data type of output value
 * @param {Function} onChange original function to be modified
 * @param {Any} value value to be type casted
 * @param  {...any} args rest of orininal function arguments
 */
const enhancedOnChange = (dataType, onChange, value, ...args) => {
  const sanitizedValue = sanitizeValue(value);
  return onChange(
    Array.isArray(sanitizedValue)
      ? sanitizedValue.map(item => convertType(dataType, sanitizeValue(item)))
      : convertType(dataType, sanitizedValue),
    ...args);};

export default enhancedOnChange;
