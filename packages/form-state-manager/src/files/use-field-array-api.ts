import { FieldArrayApi } from '../types/use-field-array-api';
import arrayMove from '../utils/array-move';
import { Change, GetFieldValue } from '../types/manager-api';

const useFieldArrayApi = (change: Change, getFieldValue: GetFieldValue): FieldArrayApi => {
  const enhancedGetFieldValue = (name: string): any[] => getFieldValue(name) || [];

  const concat = (name: string, value: any[]) => change(name, [...enhancedGetFieldValue(name), ...value]);
  const forEach = (name: string, iterator: (name: string, index: number) => void) =>
    enhancedGetFieldValue(name).forEach((_v: any, index: number) => iterator(`${name}[${index}]`, index));
  const insert = (name: string, index: number, value?: any) => {
    const internalValue: any[] = enhancedGetFieldValue(name);
    return change(name, [...internalValue.slice(0, index), value, ...internalValue.slice(index)]);
  };

  const map = (name: string, iterator: (name: string, index: number) => string) =>
    enhancedGetFieldValue(name).map((_v: any, index: number) => iterator(`${name}[${index}]`, index));
  const move = (name: string, from: number, to: number) => change(name, arrayMove(enhancedGetFieldValue(name), from, to));
  const pop = (name: string) => {
    const copy = [...enhancedGetFieldValue(name)];
    const valueToReturn = copy.pop();
    change(name, copy);
    return valueToReturn;
  };

  const push = (name: string, value?: any) => change(name, [...enhancedGetFieldValue(name), value]);
  const remove = (name: string, index: number) =>
    change(
      name,
      enhancedGetFieldValue(name).filter((_: any, itemIndex: number) => index !== itemIndex)
    );
  const removeBatch = (name: string, indexes: number[]) =>
    change(
      name,
      enhancedGetFieldValue(name).filter((_v, index) => !indexes.includes(index))
    );
  const shift = (name: string) => {
    const copy = [...enhancedGetFieldValue(name)];
    const valueToReturn = copy.shift();
    change(name, copy);
    return valueToReturn;
  };

  const swap = (name: string, a: number, b: number) => {
    const internalValue = enhancedGetFieldValue(name);
    if (a >= 0 && b >= 0 && a < internalValue.length && b < internalValue.length) {
      const copy = [...internalValue];
      const aField = copy[a];
      copy[a] = copy[b];
      copy[b] = aField;
      change(name, copy);
    } else {
      console.error('swap indexes are out of field array value range', { a, b, range: `0 - ${internalValue.length - 1}` });
    }
  };

  const unshift = (name: string, value: any) => change(name, [value, ...enhancedGetFieldValue(name)]);
  const update = (name: string, index: number, value: any) =>
    change(
      name,
      enhancedGetFieldValue(name).map((fieldValue, fieldIndex) => (fieldIndex === index ? value : fieldValue))
    );
  return {
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
    update
  };
};

export default useFieldArrayApi;
