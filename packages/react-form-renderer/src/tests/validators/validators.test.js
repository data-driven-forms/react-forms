import { dataTypeValidator, numericality } from '../../validators/validator-functions';
import Validator from '../../validators';
import messages from '../../validators/validator-functions';
import validatorTypes from '../../validator-types';
import validatorMapper from '../../validator-mapper';

describe('New validators', () => {
  describe('Required validator', () => {
    it('should pass required validator', () => {
      expect(validatorMapper[validatorTypes.REQUIRED]()('Foo')).toBeUndefined();
    });

    it('should fail required validator', () => {
      expect(validatorMapper[validatorTypes.REQUIRED]()()).toBe('Required');
    });

    it('should fail required validator if string of white spaces', () => {
      expect(validatorMapper[validatorTypes.REQUIRED]()('  ')).toBe('Required');
    });

    it('should fail required validator if empty string', () => {
      expect(validatorMapper[validatorTypes.REQUIRED]()('')).toBe('Required');
    });

    it('should fail required validator if empty array', () => {
      expect(validatorMapper[validatorTypes.REQUIRED]()([])).toBe('Required');
    });
  });

  describe('Length validator', () => {
    it('should pass empty value', () => {
      expect(validatorMapper[validatorTypes.EXACT_LENGTH]({ threshold: 5 })('')).toBeUndefined();
    });

    it('should pass undefined value', () => {
      expect(validatorMapper[validatorTypes.EXACT_LENGTH]({ threshold: 5 })(undefined)).toBeUndefined();
    });

    it('should pass exact length of 5 characters validation', () => {
      expect(validatorMapper[validatorTypes.EXACT_LENGTH]({ threshold: 5 })('12345')).toBeUndefined();
    });

    it('should fail exact length of 5 characters validation', () => {
      expect(validatorMapper[validatorTypes.EXACT_LENGTH]({ threshold: 5 })('1234')).toBe('Should be 5 characters long.');
    });

    it('should fail exact length of 5 characters validation with custom message', () => {
      expect(validatorMapper[validatorTypes.EXACT_LENGTH]({ threshold: 5, message: 'Not 5 long' })('123456')).toBe('Not 5 long');
    });

    it('should pass min length of 3 characters validation', () => {
      expect(validatorMapper[validatorTypes.MIN_LENGTH]({ threshold: 3 })('12345')).toBeUndefined();
    });

    it('should not pass min length of 3 characters validation', () => {
      expect(validatorMapper[validatorTypes.MIN_LENGTH]({ threshold: 3 })('12')).toBe('Must have at least 3 characters.');
    });

    it('should not pass min length of 3 characters validation with custom message', () => {
      expect(validatorMapper[validatorTypes.MIN_LENGTH]({ threshold: 3, message: 'Too short!' })('12')).toBe('Too short!');
    });

    it('should pass max length of 3 characters long validation', () => {
      expect(validatorMapper[validatorTypes.MAX_LENGTH]({ threshold: 3 })('12')).toBeUndefined();
    });

    it('should not pass max length of 3 characters validation', () => {
      expect(validatorMapper[validatorTypes.MAX_LENGTH]({ threshold: 3 })('1234')).toBe('Can have maximum of 3 characters.');
    });

    it('should not pass max length of 3 characters validation with custom message', () => {
      expect(validatorMapper[validatorTypes.MAX_LENGTH]({ threshold: 3, message: 'Too long!' })('1234')).toBe('Too long!');
    });

    it('should pass min items of 3 validation', () => {
      expect(validatorMapper[validatorTypes.MIN_ITEMS]({ threshold: 3 })(['1', '2', '3'])).toBeUndefined();
    });

    it('should pass min items of 3 validation with message', () => {
      expect(validatorMapper[validatorTypes.MIN_ITEMS]({ threshold: 3, message: 'Too few' })(['1', '2'])).toBe('Too few');
    });

    it('should pass min items of 3 validation with more items', () => {
      expect(validatorMapper[validatorTypes.MIN_ITEMS]({ threshold: 3 })(['1', '2', '3', '4'])).toBeUndefined();
    });
  });

  describe('pattern validator', () => {
    it('should pass pattern validation with configured regexp pattern', () => {
      expect(validatorMapper[validatorTypes.PATTERN]({ pattern: /^Foo$/ })('Foo')).toBeUndefined();
    });

    it('should fail pattern validation and return default message', () => {
      expect(validatorMapper[validatorTypes.PATTERN]({ pattern: /^Foo$/ })('Bar')).toEqual('Value does not match pattern: /^Foo$/.');
    });

    it('should fail pattern validation and return custom message', () => {
      expect(validatorMapper[validatorTypes.PATTERN]({ pattern: /^Foo$/, message: 'Custom message' })('Bar')).toEqual('Custom message');
    });

    it('should pass pattern validation with configured regexp pattern as string', () => {
      expect(validatorMapper[validatorTypes.PATTERN]({ pattern: '^Foo$' })('Foo')).toBeUndefined();
    });

    it('should pass pattern validation with configured regexp pattern as string and with flags', () => {
      expect(validatorMapper[validatorTypes.PATTERN]({ pattern: '^Foo$', flags: 'i' })('foo')).toBeUndefined();
    });

    it('should fail pattern validation with configured regexp pattern as string', () => {
      expect(validatorMapper[validatorTypes.PATTERN]({ pattern: '^Foo$' })('Bar')).toBe('Value does not match pattern: ^Foo$.');
    });
  });

  describe('min value validator', () => {
    it('should pass the validation', () => {
      expect(validatorMapper[validatorTypes.MIN_NUMBER_VALUE]({ value: 99 })(123)).toBeUndefined();
    });

    it('should pass the validation if minimum value', () => {
      expect(validatorMapper[validatorTypes.MIN_NUMBER_VALUE]({ value: 99 })(99)).toBeUndefined();
    });

    it('should pass the validation if no input given', () => {
      expect(validatorMapper[validatorTypes.MIN_NUMBER_VALUE]({ value: 99 })()).toBeUndefined();
    });

    it('should not pass the validation (includethreshold is false)', () => {
      expect(validatorMapper[validatorTypes.MIN_NUMBER_VALUE]({ value: 99, includeThreshold: false })(99)).toEqual('Value must be greater than 99.');
    });

    it('should not pass the validation and return custom message', () => {
      expect(validatorMapper[validatorTypes.MIN_NUMBER_VALUE]({ value: 99, message: 'Foo' })(1)).toEqual('Foo');
    });

    it('should not pass the validation and return type error message', () => {
      expect(validatorMapper[validatorTypes.MIN_NUMBER_VALUE]({ value: 99, message: 'Foo' })('oo')).toEqual('Value is not a number');
    });

    it('should not pass the validation (with value as 0)', () => {
      expect(validatorMapper[validatorTypes.MIN_NUMBER_VALUE]({ value: 2 })(0)).toEqual('Value must be greater than or equal to 2.');
    });
  });

  describe('max value validator', () => {
    it('should pass the validation', () => {
      expect(validatorMapper[validatorTypes.MAX_NUMBER_VALUE]({ value: 99 })(1)).toBeUndefined();
    });

    it('should pass the validation if maximum value', () => {
      expect(validatorMapper[validatorTypes.MAX_NUMBER_VALUE]({ value: 99 })(99)).toBeUndefined();
    });

    it('should pass the validation if no input given', () => {
      expect(validatorMapper[validatorTypes.MAX_NUMBER_VALUE]({ value: 99 })()).toBeUndefined();
    });

    it('should not pass the validation (includethreshold is false)', () => {
      expect(validatorMapper[validatorTypes.MAX_NUMBER_VALUE]({ value: 99, includeThreshold: false })(99)).toEqual('Value must be less than 99');
    });

    it('should not pass the validation and return custom validation', () => {
      expect(validatorMapper[validatorTypes.MAX_NUMBER_VALUE]({ value: 99, message: 'Foo' })(123)).toEqual('Foo');
    });
  });

  describe('numericality validators', () => {
    it('is not number', () => {
      expect(numericality({ equal: 5 })('string')).toEqual('Value is not a number');
    });

    it('is not equal', () => {
      expect(numericality({ '=': 5 })(6)).toEqual('must be equal to 5.');
    });

    it('is not different', () => {
      expect(numericality({ '!=': 5 })(5)).toEqual('Value must be other than 5.');
    });

    it('is not goe', () => {
      expect(numericality({ '>=': 5 })(4)).toEqual('Value must be greater than or equal to 5.');
    });

    it('is not loe', () => {
      expect(numericality({ '<=': 5 })(6)).toEqual('Value must be less than or equal to 5');
    });

    it('is not greater', () => {
      expect(numericality({ '>': 5 })(5)).toEqual('Value must be greater than 5.');
    });

    it('is not less', () => {
      expect(numericality({ '<': 5 })(5)).toEqual('Value must be less than 5');
    });

    it('is not even', () => {
      expect(numericality({ even: true })(5)).toEqual('Number must be even');
    });

    it('is not odd', () => {
      expect(numericality({ odd: true })(4)).toEqual('Number must be odd');
    });
  });

  describe('data type validator', () => {
    it('should return float and pass', () => {
      expect(dataTypeValidator('float')()(123.232)).toBeUndefined();
    });

    it('should return negative number and pass', () => {
      expect(dataTypeValidator('number')()(-123.232)).toBeUndefined();
    });

    it('should return negative integer and pass', () => {
      expect(dataTypeValidator('integer')()(-123)).toBeUndefined();
    });

    it('should return negative float and pass', () => {
      expect(dataTypeValidator('float')()(-123.123)).toBeUndefined();
    });

    it('should return float and pass 2', () => {
      expect(dataTypeValidator('float')()(123)).toBeUndefined();
    });

    it('should return float validator and fail', () => {
      expect(dataTypeValidator('float')({ message: 'Should be float' })('string')).toEqual('Should be float');
    });

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

    describe('data-type arrays', () => {
      it('should pass validation of an array of strings', () => {
        expect(dataTypeValidator('string')()(['Foo', 'Bar', 'Baz'])).toBeUndefined();
      });

      it('should fail validation of an array of strings', () => {
        expect(dataTypeValidator('string')()(['Foo', 'Bar', 2])).toBe('Field value has to be string');
      });

      it('should pass validation of an array of integers', () => {
        expect(dataTypeValidator('integer')()([1, 2, 3])).toBeUndefined();
      });

      it('should fail validation of an array of strings to integer', () => {
        expect(dataTypeValidator('integer')()([1, 2, 2.1])).toBe('Value must be integer');
        expect(dataTypeValidator('integer')()([1, 2, 'foo'])).toBe('Value must be integer');
      });

      it('should pass validation of an array of numbers', () => {
        expect(dataTypeValidator('number')()([1, 2, 3.1])).toBeUndefined();
      });

      it('should fail validation of an array of numbers', () => {
        expect(dataTypeValidator('number')()([1, 2, 'foo'])).toBe('Values must be number');
      });

      it('should pass validation of an array of booleans', () => {
        expect(dataTypeValidator('boolean')()([true, true, false, false])).toBeUndefined();
      });

      it('should fail validation of an array of booleans', () => {
        expect(dataTypeValidator('boolean')()(['foo', 2, true])).toBe('Field value has to be boolean');
      });
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
      expect(validatorMapper[validatorTypes.REQUIRED]()()).toEqual('Foo required');
      expect(validatorMapper[validatorTypes.MIN_LENGTH]({ threshold: 5 })('12')).toEqual('Bar');
    });
  });

  describe('URL validator', () => {
    const failMessage = 'String is not URL.';
    it('should pass validation without any configuration', () => {
      expect(validatorMapper[validatorTypes.URL]({})('https://www.google.com/')).toBeUndefined();
      expect(validatorMapper[validatorTypes.URL]({})('http://www.google.com/')).toBeUndefined();
    });

    it('should fail validation withouth any configuration', () => {
      expect(validatorMapper[validatorTypes.URL]({})('https://www.')).toBe(failMessage);
    });

    it('should return custom message', () => {
      const customMessage = 'customMessage';

      expect(validatorMapper[validatorTypes.URL]({ message: customMessage })('https://www.')).toBe(customMessage);
    });

    it('should validate only URL with ftp protocol', () => {
      expect(validatorMapper[validatorTypes.URL]({ protocol: 'ftp' })('https://www.google.com/')).toBe(failMessage);
      expect(validatorMapper[validatorTypes.URL]({ protocol: 'ftp' })('ftp://www.google.com/')).toBeUndefined();
    });

    it('should validate only URL with ftp and shh protocols', () => {
      expect(validatorMapper[validatorTypes.URL]({ protocols: ['ftp', 'ssh'] })('https://www.google.com/')).toBe(failMessage);
      expect(validatorMapper[validatorTypes.URL]({ protocols: ['ftp', 'ssh'] })('ftp://www.google.com/')).toBeUndefined();
      expect(validatorMapper[validatorTypes.URL]({ protocols: ['ftp', 'ssh'] })('ssh://www.google.com/')).toBeUndefined();
    });

    it('should validate only IPv4 adress as valid URL', () => {
      expect(validatorMapper[validatorTypes.URL]({ ipv4: false })('http://123.123.123.222/')).toBe(failMessage);
      expect(validatorMapper[validatorTypes.URL]({})('http://123.123.123.222')).toBeUndefined();
    });

    it('should validate only IPv4 adress as valid URL without protocol', () => {
      expect(validatorMapper[validatorTypes.URL]({ protocolIdentifier: false })('123.123.123.222')).toBeUndefined();
    });

    it('should validate only as invalid URL without initial //', () => {
      expect(validatorMapper[validatorTypes.URL]({})('//www.google.com')).toBeUndefined();
      expect(validatorMapper[validatorTypes.URL]({ emptyProtocol: false })('//www.google.com')).toBe(failMessage);
    });

    it('should validate only IPv6 adress as valid URL', () => {
      expect(validatorMapper[validatorTypes.URL]({ ipv6: false })('http://2001:db8:85a3::8a2e:370:7334:3838/')).toBe(failMessage);
      expect(validatorMapper[validatorTypes.URL]({})('http://2001:db8:85a3::8a2e:370:7334:3838')).toBeUndefined();
      expect(validatorMapper[validatorTypes.URL]({ protocolIdentifier: false })('2001:db8:85a3::8a2e:370:7334:3838')).toBeUndefined();
      expect(validatorMapper[validatorTypes.URL]({ protocolIdentifier: false })('::1')).toBeUndefined();
      expect(validatorMapper[validatorTypes.URL]({ protocolIdentifier: false })('1::')).toBeUndefined();
      expect(validatorMapper[validatorTypes.URL]({ protocolIdentifier: false })('1::xxx')).toBe(failMessage);
      expect(validatorMapper[validatorTypes.URL]({ protocolIdentifier: false, ipv4: false })('192.168.1.1')).toBe(failMessage);
    });
  });
});
