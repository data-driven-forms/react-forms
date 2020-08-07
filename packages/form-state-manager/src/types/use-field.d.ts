import AnyObject from './any-object';
import { Validator } from '../types/validate';

export interface UseFieldConfig extends AnyObject {
  name: string;
  validate?: Validator;
}

interface UseField extends AnyObject {
  input: AnyObject;
  meta: AnyObject;
}

export default UseField;
