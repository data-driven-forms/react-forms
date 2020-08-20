import { Validator } from './validate';
import AnyObject from './any-object';

export type ComposeValidators = (validators: Validator[]) => (value: any, allValues: AnyObject) => string | undefined | Promise<string | undefined>;

export default ComposeValidators;
