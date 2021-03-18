import { Meta } from './use-field';
import AnyObject from './any-object';

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

export default UseFieldArray;
