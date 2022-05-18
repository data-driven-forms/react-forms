import DataTypes, { DataType } from '../data-types';

const castToBoolean = (value: any) => {
  if (typeof value === 'boolean') {
    return value;
  }

  return value === 'true';
};

export const dataTypes: DataTypes = {
  INTEGER: 'integer',
  FLOAT: 'float',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  STRING: 'string',
};

const canBeConvertedToNumber = (value: any): any => !isNaN(Number(value)) && value !== '';

const convertType = (dataType: DataType, value: any): any => {
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
