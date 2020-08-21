import composeValidators from '../../files/compose-validators';

describe('composeValidators', () => {
  const one = (value) => new Promise((res, rej) => setTimeout(() => (value === 'one' ? rej('error-one') : res()), 200));
  const two = (value) => new Promise((res, rej) => setTimeout(() => (value === 'two' ? rej('error-two') : res()), 200));
  const three = (value) => (value === 'three' ? 'error-three' : undefined);
  const threeCopy = (value) => (value === 'three' ? 'error-three-copy' : undefined);

  it('should fail last sync validator', (done) => {
    expect.assertions(1);
    const validator = composeValidators([one, two, three]);
    validator('three').catch((result) => {
      expect(result).toEqual('error-three');
      done();
    });
  });

  it('should fail second async validator', (done) => {
    expect.assertions(1);
    const validator = composeValidators([one, two, three]);
    validator('two').catch((result) => {
      expect(result).toEqual('error-two');
      done();
    });
  });

  it('should fail first async validator', (done) => {
    expect.assertions(1);
    const validator = composeValidators([one, two, three]);
    validator('one').catch((result) => {
      expect(result).toEqual('error-one');
      done();
    });
  });

  it('should pass all validators', (done) => {
    expect.assertions(1);
    const validator = composeValidators([one, two, three]);
    validator('ok').then((result) => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should pass all async validators', (done) => {
    expect.assertions(1);
    const validator = composeValidators([one, two]);
    validator('ok').then((result) => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should return error message of sync validators in order all validators', (done) => {
    expect.assertions(1);
    const validator = composeValidators([three, threeCopy]);
    return validator('three').catch((result) => {
      expect(result).toEqual('error-three');
      done();
    });
  });

  it('should pass when no argument is passed to the function', (done) => {
    expect.assertions(1);
    const validator = composeValidators();
    return validator().then(() => {
      expect(true).toEqual(true);
      done();
    });
  });
});
