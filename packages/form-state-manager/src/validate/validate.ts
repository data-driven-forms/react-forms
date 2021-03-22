import AnyObject from '../any-object';
import { ManagerApi } from '../manager-api';
import { Meta } from '../use-field/use-field';
export interface FormLevelError {
  [key: string]: string;
}

export type Validator = (value: any, allValues: AnyObject, meta: Meta) => undefined | string | Promise<string | undefined>;

export type FormValidator = (allValues: AnyObject) => FormLevelError | Promise<FormLevelError>;

export type FieldLevelValidator = (
  validator: Validator,
  value: any,
  allValues: AnyObject,
  managerApi: ManagerApi,
  meta: Meta
) => string | undefined | Promise<string | undefined>;

export type FormLevelValidator = (validator: FormValidator, allValues: AnyObject, managerApi: ManagerApi) => FormLevelError | Promise<FormLevelError>;

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
