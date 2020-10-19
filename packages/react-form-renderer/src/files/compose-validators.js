const composeValidators = (validators = []) => (value, allValues, meta) => {
  const [initialValidator, ...sequenceValidators] = validators;
  const resolveValidator = (error, validator) => {
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
    return result.then(() => sequenceValidators.reduce(resolveValidator, undefined)).catch((error) => error);
  }

  return sequenceValidators.reduce(resolveValidator, result);
};

export default composeValidators;
