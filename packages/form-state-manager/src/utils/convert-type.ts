import DataTypes, { DataType } from '../types/data-types';

const castToBoolean = (value: any) => {
  if (typeof value === 'boolean') {
    return value;
  }

  return value === 'true';
};

const dataTypes: DataTypes = {
  INTEGER: 'integer',
  FLOAT: 'float',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  STRING: 'string'
};

const convertType = (dataType: DataType, value: any): any =>
  ({
    [dataTypes.INTEGER]: !isNaN(Number(value)) && parseInt(value),
    [dataTypes.FLOAT]: !isNaN(Number(value)) && parseFloat(value),
    [dataTypes.NUMBER]: Number(value),
    [dataTypes.BOOLEAN]: castToBoolean(value),
    [dataTypes.STRING]: String(value)
  }[dataType] || value);

export default convertType;
