import dataTypes from '../data-types';

/**
 * Casts string true/false to boolean
 * @param {String} value value
 */
const castToBoolean = (value) => {
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
const convertType = (dataType, value) =>
  ({
    [dataTypes.INTEGER]: !isNaN(Number(value)) && parseInt(value),
    [dataTypes.FLOAT]: !isNaN(Number(value)) && parseFloat(value),
    [dataTypes.NUMBER]: Number(value),
    [dataTypes.BOOLEAN]: castToBoolean(value)
  }[dataType] || value);

export default convertType;
