import useField from '../use-field';
import useFieldArrayApi from '../use-field-array-api';
import { useRef, useContext } from 'react';
import FormManagerContext from '../form-manager-context';
import AnyObject from '../any-object';
import { Meta } from '../use-field/use-field';

export interface UseFieldArrayConfig extends AnyObject {
  name: string;
  initialValue: any[];
}
export interface FieldArrayMeta extends Meta {
  length: number;
}

export interface UseFieldArrayMethods {
  concat: (value: any[]) => void;
  forEach: (iterator: (name: string, index: number) => void) => void;
  insert: (index: number, value?: any) => void;
  map: (iterator: (name: string, index: number) => string) => string[];
  move: (from: number, to: number) => void;
  pop: () => any;
  push: (value?: any) => void;
  remove: (index: number) => void;
  removeBatch: (indexes: number[]) => void;
  shift: () => any;
  swap: (a: number, b: number) => void;
  unshift: (value: any) => void;
  update: (index: number, value: any) => void;
}

export type UseFieldArrayFields = UseFieldArrayMethods &
  AnyObject & {
    name: string;
    length: number;
    value: any[];
  };

export interface UseFieldArrayApi {
  fields: UseFieldArrayFields;
  meta: FieldArrayMeta;
}

export type UseFieldArray = (config: UseFieldArrayConfig) => UseFieldArrayApi;

export interface FieldArrayApi {
  concat: (name: string, value: any[]) => void;
  forEach: (name: string, iterator: (name: string, index: number) => void) => void;
  insert: (name: string, index: number, value?: any) => void;
  map: (name: string, iterator: (name: string, index: number) => string) => string[];
  move: (name: string, from: number, to: number) => void;
  pop: (name: string) => any;
  push: (name: string, value?: any) => void;
  remove: (name: string, index: number) => void;
  removeBatch: (name: string, indexes: number[]) => void;
  shift: (name: string) => any;
  swap: (name: string, a: number, b: number) => void;
  unshift: (name: string, value: any) => void;
  update: (name: string, index: number, value: any) => void;
}

const createFieldArrayMethods = (fieldArrayApi: FieldArrayApi, name: string): UseFieldArrayMethods => {
  const obj = Object.entries(fieldArrayApi).reduce(
    (acc, [methodName, apiMethod]) => ({
      ...acc,
      [methodName]: (...args: unknown[]) => apiMethod(name, ...args),
    }),
    {}
  );
  return obj as UseFieldArrayMethods;
};

const useFieldArray: UseFieldArray = (props) => {
  const { change, getFieldValue } = useContext(FormManagerContext);
  const fieldArrayApi = useFieldArrayApi(change, getFieldValue);
  const {
    input: { value },
    meta,
    ...rest
  } = useField(props);

  const { name, initialValue, ...passProps } = props;
  const { current: fieldArrayMethods } = useRef<UseFieldArrayMethods>(createFieldArrayMethods(fieldArrayApi, name));
  const internalValue = Array.isArray(value) ? value : [];

  const fields = {
    length: internalValue.length,
    name,
    value,
    ...fieldArrayMethods,
    ...rest,
  };
  return {
    fields,
    meta: { ...meta, length: internalValue.length },
    ...passProps,
  };
};

export default useFieldArray;
