import convertType from './convert-type';
import { DataType, DataTypeTypes } from '../types/data-types';

const convertValue = (value: any, dataType: DataType): DataTypeTypes => {
  if (value === undefined || !dataType) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((value) =>
      typeof value === 'object'
        ? {
            ...value,
            value: Object.prototype.hasOwnProperty.call(value, 'value') ? convertType(dataType, value.value) : value
          }
        : convertType(dataType, value)
    );
  }

  return convertType(dataType, value);
};

export default convertValue;
