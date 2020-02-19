const composeValidators = (validators = []) => (value, allValues) =>
  validators.reduce(
    (error, validator) => error
      || (typeof validator === 'function'
        ? validator(value, allValues)
        : undefined),
    undefined,
  );

export default composeValidators;
