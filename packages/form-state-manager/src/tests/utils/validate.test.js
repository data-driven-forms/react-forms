import { fieldLevelValidator } from '../../utils/validate';
import createManagerApi from '../../utils/manager-api';

describe('validate', () => {
  describe('field level', () => {
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

  describe('form level', () => {
    it('should validate sync form level function', () => {
      const validate = jest.fn().mockImplementation(({ value }) => (value === 'foo' ? 'failed' : undefined));

      const managerApi = createManagerApi({ validate });

      managerApi().registerField({ name: 'field', render: jest.fn() });
      expect(validate).toHaveBeenCalled();
      validate.mockClear();

      managerApi().change('field', 'different');
      expect(validate).toHaveBeenCalledWith({ field: 'different' });
    });

    it('should validate async form level function', async () => {
      jest.useFakeTimers();

      const validate = jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve('first'), 1000)));

      const managerApi = createManagerApi({ validate });

      managerApi().registerField({ name: 'field', render: jest.fn() });
      expect(validate).toHaveBeenCalled();
      validate.mockClear();

      managerApi().change('field', 'different');
      expect(validate).toHaveBeenCalledWith({ field: 'different' });
      expect(managerApi().validating).toEqual(true);

      await jest.runAllTimers();

      expect(managerApi().validating).toEqual(false);
    });

    it('should stack async form validations', async () => {
      jest.useFakeTimers();

      const validate = jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve('first'), 1000)));

      const managerApi = createManagerApi({ validate });

      managerApi().registerField({ name: 'field', render: jest.fn() });
      expect(validate).toHaveBeenCalled();
      validate.mockClear();

      managerApi().change('field', 'different');
      expect(validate).toHaveBeenCalledWith({ field: 'different' });
      expect(managerApi().validating).toEqual(true);

      await jest.advanceTimersByTime(500); //wait a little to trigger second valiaton

      managerApi().change('field', 'different2');
      expect(validate).toHaveBeenCalledWith({ field: 'different2' });

      await jest.advanceTimersByTime(510); // finish first validation

      expect(managerApi().validating).toEqual(true);

      await jest.runAllTimers(); // finish second validation

      expect(managerApi().validating).toEqual(false);
    });
  });

  describe('combination', () => {
    it('should stack field and form async validations', async () => {
      jest.useFakeTimers();

      const finishFirst = jest.fn();

      const formValidate = jest.fn().mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => {
              finishFirst();
              resolve('first');
            }, 1000)
          )
      );
      const fieldValidator = () => new Promise((resolve) => setTimeout(() => resolve('second'), 1500));

      const managerApi = createManagerApi({ validate: formValidate });

      managerApi().change('field', 'foo');
      fieldLevelValidator(fieldValidator, 'foo', {}, managerApi);

      expect(managerApi().validating).toBe(true);
      expect(formValidate).toHaveBeenCalledWith({ field: 'foo' });

      await jest.advanceTimersByTime(1000); // finish field validation

      expect(managerApi().validating).toBe(true);
      expect(finishFirst).toHaveBeenCalled();

      await jest.advanceTimersByTime(500); // finish form validation

      expect(managerApi().validating).toBe(false);
    });
  });
});
