import useField from './use-field';
import UseFieldArray from '../types/use-field-array';
import arrayMove from '../utils/array-move';

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

  const update = (index: number, value: any) => onChange(internalValue.map((fieldValue, fieldIndex) => (fieldIndex === index ? value : fieldValue)));

  const move = (from: number, to: number) => onChange(arrayMove(internalValue, from, to));

  const swap = (a: number, b: number) => {
    if (a >= 0 && b >= 0 && a < internalValue.length && b < internalValue.length) {
      const copy = [...internalValue];
      const aField = copy[a];
      copy[a] = copy[b];
      copy[b] = aField;
      onChange(copy);
    } else {
      console.error('swap indexes are out of field array value range', { a, b, range: `0 - ${internalValue.length - 1}` });
    }
  };

  const unshift = (value: any) => onChange([value, ...internalValue]);

  const insert = (index: number, value?: any) => onChange([...internalValue.slice(0, index), value, ...internalValue.slice(index)]);

  const concat = (value: any[]) => onChange([...internalValue, ...value]);

  const removeBatch = (indexes: number[]) => onChange(internalValue.filter((_v, index) => !indexes.includes(index)));

  const fields = {
    length: internalValue.length,
    name,
    value,
    concat,
    forEach,
    insert,
    map,
    move,
    pop,
    push,
    remove,
    removeBatch,
    shift,
    swap,
    unshift,
    update,
    ...rest
  };
  return {
    fields,
    meta
  };
};

export default useFieldArray;
