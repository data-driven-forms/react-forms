import { Validator } from './validate';
import AnyObject from './any-object';
import { Meta } from './use-field';

export interface WarningObject<T = string | undefined> {
  type: 'warning';
  error: T;
}

export type ComposeValidators<T = WarningObject | string | undefined> = (
  validators: Validator[]
) => (value: any, allValues: AnyObject, meta: Meta) => Promise<T> | T;

export default ComposeValidators;
