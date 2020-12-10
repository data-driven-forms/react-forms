import AnyObject from '../types/any-object';
import { FieldLevelValidator, FormLevelValidator, FormLevelError } from '../types/validate';

export const isPromise = (obj: AnyObject | PromiseLike<unknown> | string | undefined): boolean =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

export const fieldLevelValidator: FieldLevelValidator = (validator, value, allValues, managerApi, meta) => {
  const result = validator(value, allValues, meta);
  if (isPromise(result)) {
    const asyncResult = result as Promise<string | undefined>;
    managerApi().registerAsyncValidator(asyncResult);
    asyncResult.then(() => undefined).catch((error) => error);
    return result;
  }

  return result;
};

export const formLevelValidator: FormLevelValidator = (validator, allValues, managerApi) => {
  const result = validator(allValues);
  if (isPromise(result)) {
    const asyncResult = result as Promise<FormLevelError>;
    managerApi().registerAsyncValidator(asyncResult);
    asyncResult.then(() => undefined).catch((error) => error);
    return result;
  }

  return result;
};
