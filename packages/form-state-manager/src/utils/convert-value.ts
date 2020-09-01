import convertType from './convert-type';
import { DataType } from '../types/data-types';

const convertValue = (value: any, dataType: DataType): any => {
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
