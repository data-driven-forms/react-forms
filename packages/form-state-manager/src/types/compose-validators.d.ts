import { Validator } from './validate';
import AnyObject from './any-object';

export type ComposeValidators = (validators: Validator[]) => (value: any, allValues: AnyObject) => Promise<any> | any;

export default ComposeValidators;
