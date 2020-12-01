import { memoize } from '../common/helpers';
import { dataTypeValidator } from '../validators/validator-functions';
import composeValidators from '../compose-validators/compose-validators';

export const convertToWarning = (validator) => (...args) => ({
  type: 'warning',
  error: validator(...args)
});

export const prepareValidator = (validator, mapper) => {
  if (typeof validator === 'function') {
    return memoize(validator);
  }

  if (validator.warning) {
    return convertToWarning(mapper[validator.type]({ ...validator }));
  }

  return mapper[validator.type]({ ...validator });
};

export const getValidate = (validate, dataType, mapper = {}) => [
  ...(validate ? validate.map((validator) => prepareValidator(validator, mapper)) : []),
  ...(dataType ? [dataTypeValidator(dataType)()] : [])
];

export const prepareArrayValidator = (validation) => (value = []) => {
  if (!Array.isArray(value)) {
    return;
  }

  const arrayValidator = composeValidators(validation);
  let result = arrayValidator(value && value.length > 0 ? value : undefined);
  if (typeof result === 'function') {
    result = result(value);
  }

  return result;
};
