import { Meta } from './use-subscription';

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
    map: (iterator: (name: string, index: number) => string) => string[];
    pop: () => any;
    push: (value?: any) => void;
    remove: (index: number) => void;
    shift: () => any;
    update: (index: number, value: any) => void;
  };
  meta: Meta;
}

export type UseFieldArray = (config: UseFieldArrayConfig) => FieldArrayApi;

export default UseFieldArray;
