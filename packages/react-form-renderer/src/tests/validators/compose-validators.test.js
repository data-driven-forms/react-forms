import composeValidators from '../../compose-validators';

describe('Compose validators', () => {
  const syncValidator = (value) => (value === 'sync-error' ? 'sync-error' : undefined);
  const asyncValidator = (value, allValues) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (value === 'error') {
          reject('Async validation failed');
        }

        resolve('hola');
      })
    );

  it('should pass async validator', () => {
    return composeValidators([asyncValidator])('Good value').then((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('should fail async validator', () => {
    return composeValidators([asyncValidator])('error').then((result) => {
      expect(result).toBe('Async validation failed');
    });
  });

  it('should pass async validator but fail sync sequence', () => {
    return composeValidators([asyncValidator, syncValidator])('sync-error').then((result) => {
      expect(result).toBe('sync-error');
    });
  });

  it('should fail async validator before running sync', () => {
    return composeValidators([asyncValidator, syncValidator])('error').then((result) => {
      expect(result).toBe('Async validation failed');
    });
  });

  it('should pass async and sync validation', () => {
    return composeValidators([asyncValidator, syncValidator])('good').then((result) => {
      expect(result).toBeUndefined();
    });
  });
});
