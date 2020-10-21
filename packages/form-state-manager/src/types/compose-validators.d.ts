import { Validator } from './validate';
import AnyObject from './any-object';

export interface WarningObject<T = string | undefined> {
  type: 'warning';
  error: T;
}

export type ComposeValidators<T = WarningObject | string | undefined> = (
  validators: Validator[]
) => (value: any, allValues: AnyObject) => Promise<T> | T;

export default ComposeValidators;
