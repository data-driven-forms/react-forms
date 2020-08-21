import { isPromise } from '../utils/validate';
import ComposeValidators from '../types/compose-validators';

/**
 * Function that allows running mulple validation functions on a single field.
 * Pass an array of validators as an argument.
 * New validation will be returned, that runs all validation until first one fails, or every validator is sucessfull.
 * @param validators Array of Validators. All validators are asynchrounsly resolved. First rejected validator error message will be returned as validation error.
 * Synchronous validators are also run in async mode.
 * @returns {Function} New validation function
 */
const composeValidators: ComposeValidators = (validators = []) => (value, allValues) =>
  Promise.all(
    validators.map((validator) => {
      const result = validator(value, allValues);
      if (isPromise(result)) {
        return result;
      }

      return result ? Promise.reject(result) : Promise.resolve(undefined);
    })
  ).then(() => undefined);

export default composeValidators;
