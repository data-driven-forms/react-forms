const composeValidators = (validators = []) => (value, allValues, meta) => {
  const [initialValidator, ...sequenceValidators] = validators;
  const resolveValidator = (error, validator) => error || (typeof validator === 'function' ? validator(value, allValues, meta) : undefined);
  if (initialValidator && typeof initialValidator === 'function') {
    const result = initialValidator(value, allValues, meta);
    if (result && result.then) {
      return result.then(() => sequenceValidators.reduce(resolveValidator, undefined)).catch((error) => error);
    }
  }

  return validators.reduce(
    (error, validator) => error || (typeof validator === 'function' ? validator(value, allValues, meta) : undefined),
    undefined
  );
};

export default composeValidators;
