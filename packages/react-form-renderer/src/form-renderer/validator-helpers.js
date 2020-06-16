import { memoize } from '../validators/helpers';
import { dataTypeValidator } from '../validators';
import composeValidators from '../files/compose-validators';

export const prepareValidator = (validator, mapper) =>
  typeof validator === 'function' ? memoize(validator) : mapper[validator.type]({ ...validator });

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
