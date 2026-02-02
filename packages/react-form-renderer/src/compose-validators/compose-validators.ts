import { ValidatorFunction } from '../validators';

function composeValidators<
  TValue = any,
  TFormValues extends Record<string, any> = Record<string, any>,
  TMeta extends Record<string, any> = Record<string, any>
>(validators: ValidatorFunction<TValue, TFormValues, TMeta>[] = []): ValidatorFunction<TValue, TFormValues, TMeta> {
  return (value: TValue, allValues?: TFormValues, meta?: TMeta) => {
    const [initialValidator, ...sequenceValidators] = validators;
    const resolveValidator = (error: any, validator: ValidatorFunction<TValue, TFormValues, TMeta>) => {
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
