import { Meta } from './use-field';

export interface UseFieldArrayConfig {
  name: string;
  initialValue: any[];
}

export interface FieldArrayApi {
  fields: {
    name: string;
    length: number;
    value: any[];
    forEach: (iterator: (name: string, index: number) => void) => void;
    insert: (index: number, value?: any) => void;
    map: (iterator: (name: string, index: number) => string) => string[];
    move: (from: number, to: number) => void;
    pop: () => any;
    push: (value?: any) => void;
    remove: (index: number) => void;
    shift: () => any;
    swap: (a: number, b: number) => void;
    unshift: (value: any) => void;
    update: (index: number, value: any) => void;
  };
  meta: Meta;
}

export type UseFieldArray = (config: UseFieldArrayConfig) => FieldArrayApi;

export default UseFieldArray;
