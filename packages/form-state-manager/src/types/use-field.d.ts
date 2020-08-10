import AnyObject from './any-object';
import { Validator } from '../types/validate';
import { Subscription } from './use-subscription';

export interface UseFieldConfig extends AnyObject {
  name: string;
  validate?: Validator;
  subscription?: Subscription;
}

interface UseField extends AnyObject {
  input: AnyObject;
  meta: AnyObject;
}

export default UseField;
