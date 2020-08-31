import composeValidators from '../../files/compose-validators';
import { isPromise } from '../../utils/validate';

describe('composeValidators', () => {
  const one = (value) => new Promise((res, rej) => setTimeout(() => (value === 'one' ? rej('error-one') : res()), 200));
  const two = (value) => new Promise((res, rej) => setTimeout(() => (value === 'two' ? rej('error-two') : res()), 200));
  const three = (value) => (value === 'three' ? 'error-three' : undefined);
  const threeCopy = (value) => (value === 'three' ? 'error-three-copy' : undefined);

  it('should fail last sync validator', () => {
    expect.assertions(2);
    const validator = composeValidators([one, two, three]);
    const result = validator('three');
    expect(isPromise(validator)).toBe(false);
    expect(result).toEqual('error-three');
  });

  it('should fail second async validator', (done) => {
    expect.assertions(2);
    const validator = composeValidators([one, two, three]);
    const result = validator('two');
    expect(isPromise(result)).toEqual(true);
    return result.catch((result) => {
      expect(result).toEqual('error-two');
      done();
    });
  });

  it('should fail first async validator', (done) => {
    expect.assertions(2);
    const validator = composeValidators([one, two, three]);
    const result = validator('one');
    expect(isPromise(result)).toBe(true);
    return result.catch((result) => {
      expect(result).toEqual('error-one');
      done();
    });
  });

  it('should pass all validators', (done) => {
    expect.assertions(2);
    const validator = composeValidators([one, two, three]);
    const result = validator('ok');
    expect(isPromise(result)).toEqual(true);
    return result.then((result) => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should pass all async validators', (done) => {
    expect.assertions(2);
    const validator = composeValidators([one, two]);
    const result = validator('ok');
    expect(isPromise(result)).toEqual(true);
    return result.then((result) => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should return error message of sync validators in order of validators', () => {
    expect.assertions(2);
    const validator = composeValidators([three, threeCopy]);
    const result = validator('three');
    expect(isPromise(result)).toEqual(false);
    expect(result).toEqual('error-three');
  });

  it('should pass when no argument is passed to the function', () => {
    expect.assertions(1);
    const validator = composeValidators();
    const result = validator();
    expect(result).toBeUndefined();
  });
});
