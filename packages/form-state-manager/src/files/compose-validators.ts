/* eslint-disable no-sequences */
import AnyObject from '../types/any-object';
import { isPromise } from '../utils/validate';
import ComposeValidators from '../types/compose-validators';

type SyncValidator = (value: any, allValues: AnyObject) => string | undefined;

/**
 * Function that allows running mulple validation functions on a single field.
 * Pass an array of validators as an argument.
 * New validation will be returned, that runs all validation until first one fails, or every validator is sucessfull.
 * @param validators Array of Validators. Only first validator in array can be asynchronous. Rest of validators must return either string or undefined
 * @returns {Function} New validation function
 */
const composeValidators: ComposeValidators = (validators = []) => (value: any, allValues: AnyObject) => {
  const [initialValidator, ...sequenceValidators] = validators;
  const resolveValidator = (error: string | undefined, validator: SyncValidator) =>
    error || (typeof validator === 'function' ? validator(value, allValues) : undefined);
  if (initialValidator && typeof initialValidator === 'function') {
    const result = initialValidator(value, allValues);
    if (result && isPromise(result)) {
      const asyncResult = result as Promise<string | undefined>;
      return asyncResult.then(() => sequenceValidators.reduce(resolveValidator as SyncValidator, undefined)).catch((error) => error);
    }
  }

  let error: string | undefined;
  let index = 0;
  while (!error || index < validators.length) {
    error = (validators[index] as SyncValidator)(value, allValues);
    index = index + 1;
  }

  return error;
};

// TODO tests
export default composeValidators;
