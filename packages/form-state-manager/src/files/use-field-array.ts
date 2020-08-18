import useField from './use-field';
import UseFieldArray from '../types/use-field-array';

const useFieldArray: UseFieldArray = ({ name, initialValue }) => {
  const {
    input: { change, value },
    meta,
    ...rest
  } = useField({ name, initialValue });
  const internalValue = Array.isArray(value) ? value : [];

  const forEach = (iterator: (name: string, index: number) => void) => {
    internalValue.forEach((_v, index) => iterator(`${name}[${index}]`, index));
  };

  const map = (iterator: (name: string, index: number) => string) => internalValue.map((_v, index) => iterator(`${name}[${index}]`, index));

  const fields = {
    name,
    forEach,
    map,
    length: internalValue.length,
    value,
    ...rest
  };
  return {
    fields,
    meta
  };
};

export default useFieldArray;
