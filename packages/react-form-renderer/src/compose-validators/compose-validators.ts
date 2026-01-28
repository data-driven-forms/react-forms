import { ValidatorFunction, ValidatorFunction_Generic } from '../validators';

const composeValidators =
  (validators: ValidatorFunction[] = []): ValidatorFunction =>
  (value, allValues, meta) => {
    const [initialValidator, ...sequenceValidators] = validators;
    const resolveValidator = (
      error: any,
      validator: ValidatorFunction
    ) => {
      if (error) {
        return error;
      }

      if (typeof validator !== 'function') {
        return undefined;
      }

      return validator(value, allValues, meta);
    };

    const result = resolveValidator(undefined, initialValidator);

    if (result?.then) {
      return result.then(() => sequenceValidators.reduce(resolveValidator, undefined)).catch((error: any) => error);
    }

    return sequenceValidators.reduce(resolveValidator, result);
  };

// Generic version with type safety - maintains backward compatibility
export function composeValidators_generic<
  TValue = any,
  TFormValues extends Record<string, any> = Record<string, any>,
  TMeta extends Record<string, any> = Record<string, any>
>(
  validators: ValidatorFunction_Generic<TValue, TFormValues, TMeta>[] = []
): ValidatorFunction_Generic<TValue, TFormValues, TMeta> {
  return (value: TValue, allValues?: TFormValues, meta?: TMeta) => {
    const [initialValidator, ...sequenceValidators] = validators;
    const resolveValidator = (
      error: any,
      validator: ValidatorFunction_Generic<TValue, TFormValues, TMeta>
    ) => {
      if (error) {
        return error;
      }

      if (typeof validator !== 'function') {
        return undefined;
      }

      return validator(value, allValues, meta);
    };

    const result = resolveValidator(undefined, initialValidator);

    if (result?.then) {
      return result.then(() => sequenceValidators.reduce(resolveValidator, undefined)).catch((error: any) => error);
    }

    return sequenceValidators.reduce(resolveValidator, result);
  };
}

export default composeValidators;