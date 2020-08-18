import AnyObject from './any-object';
import { Validator } from '../types/validate';
import { Subscription, Meta } from './use-subscription';

export interface UseFieldConfig extends AnyObject {
  name: string;
  initialValue?: any;
  validate?: Validator;
  subscription?: Subscription;
}

interface UseField extends AnyObject {
  input: AnyObject;
  meta: Meta;
}

export default UseField;
