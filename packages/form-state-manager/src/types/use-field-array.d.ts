import { Meta } from './use-subscription';

export interface UseFieldArrayConfig {
  name: string;
  initialValue: any[];
}

export interface FieldArrayApi {
  fields: {
    name: string;
    forEach: (iterator: (name: string, index: number) => void) => void;
    map: (iterator: (name: string, index: number) => string) => string[];
    length: number;
    value: any[];
  };
  meta: Meta;
}

export type UseFieldArray = (config: UseFieldArrayConfig) => FieldArrayApi;

export default UseFieldArray;
