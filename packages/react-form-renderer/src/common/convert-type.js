import dataTypes from '../files/data-types';

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
 * Check if the value can be converted to number
 * @param {Any} value value to be checked
 */
const canBeConvertedToNumber = (value) => !isNaN(Number(value)) && value !== '';

/**
 * Changes the value type
 * @param {FieldDataTypes} dataType type for value conversion
 * @param {Any} value value to be converted
 */
const convertType = (dataType, value) => {
  switch (dataType) {
    case dataTypes.INTEGER:
      return canBeConvertedToNumber(value) ? parseInt(value) : value;
    case dataTypes.FLOAT:
      return canBeConvertedToNumber(value) ? parseFloat(value) : value;
    case dataTypes.NUMBER:
      return canBeConvertedToNumber(value) ? Number(value) : value;
    case dataTypes.BOOLEAN:
      return castToBoolean(value);
    default:
      return value;
  }
};

export default convertType;
