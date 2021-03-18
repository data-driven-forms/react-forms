import { isPromise } from '../utils/validate';
import ComposeValidators from '../types/compose-validators';

/**
 * Function that allows running mulple validation functions on a single field.
 * Pass an array of validators as an argument.
 * New validation will be returned, that runs all validation until first one fails, or every validator is sucessfull.
 * @param validators Array of Validators. First rejected validator error message will be returned as validation error.
 * Synchronous validators are run in synchrounously and sync error is prioritized over async errors.
 * @returns {Function} New validation function
 */
const composeValidators: ComposeValidators = (validators = []) => (value, allValues, meta) => {
  const promises: Promise<any>[] = [];
  let index = 0;
  let error: any;
  while (validators.length > 0 && !error && index < validators.length) {
    const result = validators[index](value, allValues, meta);
    if (isPromise(result)) {
      promises.push(result as Promise<any>);
    } else {
      error = result as any;
    }

    index = index + 1;
  }

  if (error) {
    return error;
  }

  if (promises.length > 0) {
    return Promise.all(promises)
      .catch((asyncError) => {
        throw error || asyncError;
      })
      .then(() => {
        if (error) {
          throw error;
        }

        return undefined;
      });
  }

  return undefined;
};

export default composeValidators;
