import AnyObject from '../types/any-object';
import { FieldLevelValidator } from '../types/validate';

export const isPromise = (obj: AnyObject | PromiseLike<unknown> | string | undefined): boolean =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

export const fieldLevelValidator: FieldLevelValidator = (validator, value, allValues, managerApi) => {
  const result = validator(value, allValues);
  if (isPromise(result)) {
    const asyncResult = result as Promise<string | undefined>;
    managerApi().registerAsyncValidator(asyncResult);
    asyncResult.then(() => undefined).catch((error) => error);
    return result;
  }

  return result;
};
