import convertType from '../convert-type';

const convertInitialValue = (initialValue, dataType) => {
  if (initialValue === undefined || !dataType) {
    return initialValue;
  }

  if (Array.isArray(initialValue)) {
    return initialValue.map((value) =>
      typeof value === 'object'
        ? {
            ...value,
            value: Object.prototype.hasOwnProperty.call(value, 'value') ? convertType(dataType, value.value) : value
          }
        : convertType(dataType, value)
    );
  }

  return convertType(dataType, initialValue);
};

export default convertInitialValue;
