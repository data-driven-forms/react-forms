import { memoize } from '../common/helpers';
import { dataTypeValidator } from '../validators/validator-functions';
import composeValidators from '../compose-validators';
import { ValidatorFunction } from '../validators';
import { DataType } from '../data-types';

export interface WarningValidationResult {
  type: 'warning';
  error: any;
}

export interface ValidatorDefinition {
  type: string;
  warning?: boolean;
  [key: string]: any;
}

export interface ValidatorMapper {
  [key: string]: (config: any) => ValidatorFunction;
}

export type MainValidatorMapper = {
  [key: string]: ValidatorFunction | ((options?: any) => ValidatorFunction);
};

const isValidatorMapper = (mapper: ValidatorMapper | MainValidatorMapper): mapper is ValidatorMapper => {
  // Check if all values are factory functions
  return Object.values(mapper).every((value) => {
    if (typeof value !== 'function') {
      return false;
    }

    try {
      const result = value({});
      return typeof result === 'function';
    } catch {
      return false;
    }
  });
};

const convertMainValidatorMapper = (mainMapper: MainValidatorMapper): ValidatorMapper => {
  const converted: ValidatorMapper = {};
  for (const [key, value] of Object.entries(mainMapper)) {
    if (typeof value === 'function') {
      // Try to determine if it's a factory function or ValidatorFunction
      try {
        const testResult = value({});
        if (typeof testResult === 'function') {
          // It's a factory function
          converted[key] = value as (config: any) => ValidatorFunction;
        } else {
          // It's a ValidatorFunction, wrap it
          converted[key] = () => value as ValidatorFunction;
        }
      } catch {
        // If calling with {} fails, it's likely a ValidatorFunction
        converted[key] = () => value as ValidatorFunction;
      }
    }
  }

  return converted;
};

export const convertToWarning =
  (validator: ValidatorFunction): ValidatorFunction =>
  (...args: Parameters<ValidatorFunction>) => ({
    type: 'warning',
    error: validator(args[0], args[1], args[2]),
  });

export const prepareValidator = (validator: ValidatorDefinition | ValidatorFunction, mapper: ValidatorMapper): ValidatorFunction => {
  if (typeof validator === 'function') {
    return memoize(validator);
  }

  if (validator.warning) {
    return convertToWarning(mapper[validator.type]({ ...validator }));
  }

  return mapper[validator.type]({ ...validator });
};

export const getValidate = (
  validate?: (ValidatorDefinition | ValidatorFunction)[],
  dataType?: DataType,
  mapper: ValidatorMapper | MainValidatorMapper = {}
): ValidatorFunction[] => {
  const convertedMapper = isValidatorMapper(mapper) ? mapper : convertMainValidatorMapper(mapper as MainValidatorMapper);

  return [
    ...(validate ? validate.map((validator) => prepareValidator(validator, convertedMapper)) : []),
    ...(dataType ? [dataTypeValidator(dataType)() as unknown as ValidatorFunction] : []),
  ];
};

export const prepareArrayValidator =
  (validation: ValidatorFunction[]) =>
  (value: any[] = []): any => {
    if (!Array.isArray(value)) {
      return;
    }

    const arrayValidator = composeValidators(validation);
    let result = arrayValidator(value && value.length > 0 ? value : undefined);

    // Handle both sync and async validation results
    if (typeof result === 'function') {
      result = (result as Function)(value);
    } else if ((result as any)?.then && typeof (result as any).then === 'function') {
      // Handle Promise case - return the promise
      return result;
    }

    return result;
  };
