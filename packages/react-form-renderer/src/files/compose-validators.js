const composeValidators = (validators = []) => (value, allValues) => {
  const [initialValidator, ...sequenceValidators] = validators;
  const resolveValidator = (error, validator) => error || (typeof validator === 'function' ? validator(value, allValues) : undefined);
  if (initialValidator && typeof initialValidator === 'function') {
    const result = initialValidator(value, allValues);
    if (result && result.then) {
      return result.then(() => sequenceValidators.reduce(resolveValidator, undefined)).catch((error) => error);
    }
  }

  return validators.reduce((error, validator) => error || (typeof validator === 'function' ? validator(value, allValues) : undefined), undefined);
};

export default composeValidators;
