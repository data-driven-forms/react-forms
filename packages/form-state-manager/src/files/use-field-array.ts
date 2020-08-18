import useField from './use-field';
import UseFieldArray from '../types/use-field-array';

const useFieldArray: UseFieldArray = ({ name, initialValue }) => {
  const {
    input: { onChange, value },
    meta,
    ...rest
  } = useField({ name, initialValue });
  const internalValue = Array.isArray(value) ? value : [];

  const forEach = (iterator: (name: string, index: number) => void) => {
    internalValue.forEach((_v, index) => iterator(`${name}[${index}]`, index));
  };

  const map = (iterator: (name: string, index: number) => string) => internalValue.map((_v, index) => iterator(`${name}[${index}]`, index));

  const push = (newValue?: any) => onChange([...internalValue, newValue]);

  const remove = (index: number) => onChange(internalValue.filter((_: any, itemIndex: number) => index !== itemIndex));

  const pop = () => {
    const copy = [...internalValue];
    const valueToReturn = copy.pop();
    onChange(copy);
    return valueToReturn;
  };

  const shift = () => {
    const copy = [...internalValue];
    const valueToReturn = copy.shift();
    onChange(copy);
    return valueToReturn;
  };

  const fields = {
    length: internalValue.length,
    name,
    value,
    forEach,
    map,
    pop,
    push,
    remove,
    shift,
    ...rest
  };
  return {
    fields,
    meta
  };
};

export default useFieldArray;
