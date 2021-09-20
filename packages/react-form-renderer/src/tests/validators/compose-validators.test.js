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

  it('should pass async validator', async () => {
    const result = await composeValidators([asyncValidator])('Good value');
    expect(result).toBeUndefined();
  });

  it('should fail async validator', async () => {
    const result = await composeValidators([asyncValidator])('error');
    expect(result).toBe('Async validation failed');
  });

  it('should pass async validator but fail sync sequence', async () => {
    const result = await composeValidators([asyncValidator, syncValidator])('sync-error');
    expect(result).toBe('sync-error');
  });

  it('should fail async validator before running sync', async () => {
    const result = await composeValidators([asyncValidator, syncValidator])('error');
    expect(result).toBe('Async validation failed');
  });

  it('should pass async and sync validation', async () => {
    const result = await composeValidators([asyncValidator, syncValidator])('good');
    expect(result).toBeUndefined();
  });
});
