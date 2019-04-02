import { validators } from '../../constants';
import { dataTypeValidator } from '../../validators/';
import validatorMapper from '../../validators/validator-mapper';
import Validator from '../../validators/validators';
import messages from '../../validators/messages';

describe('New validators', () => {
  describe('Required validator', () => {
    it('should pass required validator', () => {
      expect(validatorMapper(validators.REQUIRED)()('Foo')).toBeUndefined();
    });

    it('should fail required validator', () => {
      expect(validatorMapper(validators.REQUIRED)()()).toBe('Required');
    });

    it('should fail required validator if string of white spaces', () => {
      expect(validatorMapper(validators.REQUIRED)()('  ')).toBe('Required');
    });

    it('should fail required validator if empty string', () => {
      expect(validatorMapper(validators.REQUIRED)()('')).toBe('Required');
    });

    it('should fail required validator if empty array', () => {
      expect(validatorMapper(validators.REQUIRED)()([])).toBe('Required');
    });
  });

  describe('Length validator', () => {
    it('should pass exact lenght of 5 characters validation', () => {
      expect(validatorMapper(validators.EXACT_LENGTH)({ treshold: 5 })('12345')).toBeUndefined();
    });

    it('should fail exact lenght of 5 characters validation', () => {
      expect(validatorMapper(validators.EXACT_LENGTH)({ treshold: 5 })('1234')).toBe('Should be 5 characters long.');
    });

    it('should fail exact lenght of 5 characters validation with custom message', () => {
      expect(validatorMapper(validators.EXACT_LENGTH)({ treshold: 5, message: 'Not 5 long' })('123456')).toBe('Not 5 long');
    });

    it('should pass min length of 3 characters validation', () => {
      expect(validatorMapper(validators.MIN_LENGTH)({ treshold: 3 })('12345')).toBeUndefined();
    });

    it('should not pass min length of 3 characters validation', () => {
      expect(validatorMapper(validators.MIN_LENGTH)({ treshold: 3 })('12')).toBe('Must have at least 3 characters.');
    });

    it('should not pass min length of 3 characters validation with custom message', () => {
      expect(validatorMapper(validators.MIN_LENGTH)({ treshold: 3, message: 'Too short!' })('12')).toBe('Too short!');
    });

    it('should pass max lenght of 3 characters long validation', () => {
      expect(validatorMapper(validators.MAX_LENGTH)({ treshold: 3 })('12')).toBeUndefined();
    });

    it('should not pass max lenght of 3 characters validation', () => {
      expect(validatorMapper(validators.MAX_LENGTH)({ treshold: 3 })('1234')).toBe('Can have maximum of 3 characters.');
    });

    it('should not pass max lenght of 3 characters validation with custom message', () => {
      expect(validatorMapper(validators.MAX_LENGTH)({ treshold: 3, message: 'Too long!' })('1234')).toBe('Too long!');
    });
  });

  describe('pattern validator', () => {
    it('should pass pattern validation with configured regexp pattern', () => {
      expect(validatorMapper(validators.PATTERN_VALIDATOR)({ pattern: /^Foo$/ })('Foo')).toBeUndefined();
    });

    it('should fail pattern validation and return default message', () => {
      expect(validatorMapper(validators.PATTERN_VALIDATOR)({ pattern: /^Foo$/ })('Bar')).toEqual('Value does not match pattern: /^Foo$/.');
    });

    it('should fail pattern validation and return custom message', () => {
      expect(validatorMapper(validators.PATTERN_VALIDATOR)({ pattern: /^Foo$/, message: 'Custom message' })('Bar')).toEqual('Custom message');
    });

    it('should pass pattern validation with configured regexp pattern as string', () => {
      expect(validatorMapper(validators.PATTERN_VALIDATOR)({ pattern: '^Foo$' })('Foo')).toBeUndefined();
    });

    it('should fail pattern validation with configured regexp pattern as string', () => {
      expect(validatorMapper(validators.PATTERN_VALIDATOR)({ pattern: '^Foo$' })('Bar')).toBe('Value does not match pattern: ^Foo$.');
    });
  });

  describe('min value validator', () => {
    it('should pass the validation', () => {
      expect(validatorMapper(validators.MIN_NUMBER_VALUE)({ value: 99 })(123)).toBeUndefined();
    });

    it('should pass the validation if minimum value', () => {
      expect(validatorMapper(validators.MIN_NUMBER_VALUE)({ value: 99 })(99)).toBeUndefined();
    });

    it('should pass the validation if no input given', () => {
      expect(validatorMapper(validators.MIN_NUMBER_VALUE)({ value: 99 })()).toBeUndefined();
    });

    it('should not pass the validation (includeTreshold is false)', () => {
      expect(validatorMapper(validators.MIN_NUMBER_VALUE)({ value: 99, includeThreshold: false })(99)).toEqual('Value must be greater than 99.');
    });

    it('should not pass the validation and return custom message', () => {
      expect(validatorMapper(validators.MIN_NUMBER_VALUE)({ value: 99, message: 'Foo' })(1)).toEqual('Foo');
    });
  });

  describe('max value validator', () => {
    it('should pass the validation', () => {
      expect(validatorMapper(validators.MAX_NUMBER_VALUE)({ value: 99 })(1)).toBeUndefined();
    });

    it('should pass the validation if maximum value', () => {
      expect(validatorMapper(validators.MAX_NUMBER_VALUE)({ value: 99 })(99)).toBeUndefined();
    });

    it('should pass the validation if no input given', () => {
      expect(validatorMapper(validators.MAX_NUMBER_VALUE)({ value: 99 })()).toBeUndefined();
    });

    it('should not pass the validation (includeTreshold is false)', () => {
      expect(validatorMapper(validators.MAX_NUMBER_VALUE)({ value: 99, includeThreshold: false })(99)).toEqual('Value must be less than 99');
    });

    it('should not pass the validation and return custom validation', () => {
      expect(validatorMapper(validators.MAX_NUMBER_VALUE)({ value: 99, message: 'Foo' })(123)).toEqual('Foo');
    });
  });

  describe('data type validator', () => {
    it('should return string validator and pass', () => {
      expect(dataTypeValidator('string')({ message: 'String message' })('Foo')).toBeUndefined();
    });

    it('should return string validator and pass if no value is given', () => {
      expect(dataTypeValidator('string')({ message: 'String message' })()).toBeUndefined();
    });

    it('should return string validator and fail', () => {
      expect(dataTypeValidator('string')({ message: 'Should be string' })(123)).toEqual('Should be string');
    });

    it('should return integerValidator and pass', () => {
      expect(dataTypeValidator('integer')()(123)).toBeUndefined();
    });

    it('should return integerValidator and pass if no value given', () => {
      expect(dataTypeValidator('integer')()()).toBeUndefined();
    });

    it('should return integerValidator and fail', () => {
      expect(dataTypeValidator('integer')({ message: 'Should be integer' })('Foo')).toEqual('Should be integer');
    });

    it('should return integerValidator and fail if decimal nuber given', () => {
      expect(dataTypeValidator('integer')({ message: 'Should be integer' })(123.456)).toEqual('Should be integer');
    });

    it('should return boolean validator and pass', () => {
      expect(dataTypeValidator('boolean')()(false)).toBeUndefined();
    });

    it('should return boolean validator and pass if no value given', () => {
      expect(dataTypeValidator('boolean')()()).toBeUndefined();
    });

    it('should return boolean validator and pass fail', () => {
      expect(dataTypeValidator('boolean')({ message: 'Value should be boolean' })('Foo')).toEqual('Value should be boolean');
    });

    it('should return numberValidator and pass', () => {
      expect(dataTypeValidator('number')()(123.33)).toBeUndefined();
    });

    it('should return numberValidator and pass if no value given', () => {
      expect(dataTypeValidator('number')()()).toBeUndefined();
    });

    it('should return numberValidator and fail', () => {
      expect(dataTypeValidator('integer')({ message: 'Should be super interger' })('Foo')).toEqual('Should be super interger');
    });
  });
  describe('Validators default messages overrides', () => {
    beforeAll(() => {
      // set custom messages ovverides for validators
      Validator.messages = {
        ...Validator.messages,
        required: 'Foo required',
        tooShort: 'Bar',
      };
    });
    afterAll(() => {
      // reset custom messages ovverides for validators
      Validator.messages = {
        ...messages,
      };
    });

    it('should fail validations and return globally overriden messages', () => {
      expect(validatorMapper(validators.REQUIRED)()()).toEqual('Foo required');
      expect(validatorMapper(validators.MIN_LENGTH)({ treshold: 5 })('12')).toEqual('Bar');
    });
  });
});
