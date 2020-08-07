import { fieldLevelValidator } from '../../utils/validate';
import createManagerApi from '../../utils/manager-api';

describe('validate', () => {
  it('should validate sync field level function', () => {
    const managerApi = createManagerApi(jest.fn());
    const validator = (value) => (value === 'foo' ? 'failed' : undefined);
    expect(fieldLevelValidator(validator, 'foo', {}, managerApi)).toEqual('failed');
    expect(fieldLevelValidator(validator, 'bar', {}, managerApi)).toBeUndefined();
  });

  it('should fail async field level validation', () => {
    jest.useFakeTimers();
    const managerApi = createManagerApi(jest.fn());
    const validator = () =>
      new Promise((_res, reject) =>
        setTimeout(() => {
          return reject('failed');
        }, 50)
      );
    const promise = fieldLevelValidator(validator, 'foo', {}, managerApi);
    jest.runAllTimers();
    expect(managerApi().validating).toBe(true);
    return promise.catch((result) => {
      expect(result).toEqual('failed');
      /**
       * we need to call setImmediate to synchronize the jest test
       */
      setImmediate(() => {
        expect(managerApi().validating).toBe(false);
      });
    });
  });

  it('should correctly keep validating flag set until all async validators are resolved', (done) => {
    jest.useFakeTimers();
    const managerApi = createManagerApi(jest.fn());
    const slowValidator = () => new Promise((resolve) => setTimeout(() => resolve('first'), 1000));
    const fasterValidator = () => new Promise((_res, reject) => setTimeout(() => reject('second'), 10));
    /**
     * Trigger first slower validator
     */
    fieldLevelValidator(slowValidator, 'foo', {}, managerApi);
    expect(managerApi().validating).toBe(true);
    /**
     * advance time by less than i takes the first validator to resolve
     */
    jest.advanceTimersByTime(200);
    /**
     * Trigger second faster validator
     */
    fieldLevelValidator(fasterValidator, 'foo', {}, managerApi);
    expect(managerApi().validating).toBe(true);
    /**
     * Advance timer just enough to resolve the second promise but keep the first pending.
     */
    jest.advanceTimersByTime(11);
    expect(managerApi().validating).toBe(true);
    /**
     * Run enough time to resolve the slower first validator
     */
    jest.runAllTimers();
    setImmediate(() => {
      expect(managerApi().validating).toBe(false);
      done();
    });
  });
});
