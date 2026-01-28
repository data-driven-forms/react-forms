import { memoize, prepare, prepareMsg, selectNum, isNumber, trunc } from '../common/helpers';
import { ValidatorFunction } from '../validators';
import { ReactNode } from 'react';


interface ValidatorOptions {
  message?: ReactNode | ((arg: any) => ReactNode);
}

interface LengthOptions extends ValidatorOptions {
  '='?: string | number;
  is?: number;
  max?: number;
  maximum?: number;
  min?: number;
  minimum?: number;
}

interface PatternOptions extends ValidatorOptions {
  pattern?: string | RegExp;
  flags?: string;
}

interface NumericalityOptions extends ValidatorOptions {
  even?: boolean;
  odd?: boolean;
  '='?: string | number;
  equalTo?: number;
  '!='?: string | number;
  otherThan?: number;
  '>'?: string | number;
  greaterThan?: number;
  '<'?: string | number;
  lessThan?: number;
  '>='?: string | number;
  greaterThanOrEqualTo?: number;
  '<='?: string | number;
  lessThanOrEqualTo?: number;
}

export const required = memoize(({ message }: ValidatorOptions = {}): ValidatorFunction => {
  return prepare((value: any) => {
    let failsValidation = true;

    if (typeof value === 'string') {
      failsValidation = !value.trim();
    } else if (Array.isArray(value)) {
      failsValidation = !value.length;
    } else {
      failsValidation = value === null || value === undefined;
    }

    if (failsValidation) {
      return prepareMsg(message, 'required', {}).defaultMessage;
    }
  });
});


export const length = memoize(({ '=': equal, is, max, maximum, min, minimum, message }: LengthOptions = {}): ValidatorFunction => {
  const finalEqual = selectNum(equal, is);
  const finalMin = selectNum(min, minimum);
  const finalMax = selectNum(max, maximum);

  return prepare((value: any) => {
    if (!value) {
      return;
    }

    if (finalEqual !== null && value.length !== finalEqual) {
      const msg = prepareMsg(message, 'wrongLength', { count: finalEqual }).defaultMessage;
      return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalEqual) : String(msg);
    }

    if (finalMax !== null && value.length > finalMax) {
      const msg = prepareMsg(message, 'tooLong', { count: finalMax }).defaultMessage;
      return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalMax) : String(msg);
    }

    if (finalMin !== null && value.length < finalMin) {
      const msg = prepareMsg(message, 'tooShort', { count: finalMin }).defaultMessage;
      return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalMin) : String(msg);
    }
  });
});


export const pattern = memoize(({ pattern: patternOption, message, flags }: PatternOptions = {}): ValidatorFunction => {
  const verifiedPattern = typeof patternOption === 'string' ? new RegExp(patternOption, flags) : patternOption;

  return prepare((value: any) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      const error = (value as any[]).find((item: any) => {
        const parsedValue =
          typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'value')
            ? item.value.toString()
            : typeof item === 'string'
            ? item
            : item.toString();
        return patternOption && !parsedValue.match(verifiedPattern);
      });
      const msg = prepareMsg(message, 'pattern', {}).defaultMessage;
      return error ? (typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(patternOption) : String(msg)) : undefined;
    }

    const parsedValue = typeof value === 'string' ? value : value.toString();
    if (patternOption && !parsedValue.match(verifiedPattern)) {
      const msg = prepareMsg(message, 'pattern', {}).defaultMessage;
      return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(patternOption) : String(msg);
    }
  });
});


export const numericality = memoize(
  ({
    even,
    odd,
    '=': equal,
    equalTo,
    '!=': diff,
    otherThan,
    '>': greater,
    greaterThan,
    '<': less,
    lessThan,
    '>=': greaterOrEqual,
    greaterThanOrEqualTo,
    '<=': lessOrEqual,
    lessThanOrEqualTo,
    message,
  }: NumericalityOptions = {}): ValidatorFunction => {
    const finalEqual = selectNum(equal, equalTo);
    const finalDiff = selectNum(diff, otherThan);
    const finalGreater = selectNum(greater, greaterThan);
    const finalGreaterOrEqual = selectNum(greaterOrEqual, greaterThanOrEqualTo);
    const finalLess = selectNum(less, lessThan);
    const finalLessOrEqual = selectNum(lessOrEqual, lessThanOrEqualTo);

    return prepare((value: any) => {
      if (value === null || value === undefined) {
        return;
      }

      if (!isNumber(value)) {
        return prepareMsg(null, 'notANumber', {}).defaultMessage;
      }

      if (finalEqual !== null && +value !== finalEqual) {
        const msg = prepareMsg(message, 'equalTo', {}).defaultMessage;
        return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalEqual) : String(msg);
      }

      if (finalDiff !== null && +value === finalDiff) {
        const msg = prepareMsg(message, 'otherThan', {}).defaultMessage;
        return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalDiff) : String(msg);
      }

      if (finalGreater !== null && +value <= finalGreater) {
        const msg = prepareMsg(message, 'greaterThan', {}).defaultMessage;
        return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalGreater) : String(msg);
      }

      if (finalGreaterOrEqual !== null && +value < finalGreaterOrEqual) {
        const msg = prepareMsg(message, 'greaterThanOrEqualTo', {}).defaultMessage;
        return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalGreaterOrEqual) : String(msg);
      }

      if (finalLess !== null && +value >= finalLess) {
        const msg = prepareMsg(message, 'lessThan', {}).defaultMessage;
        return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalLess) : String(msg);
      }

      if (finalLessOrEqual !== null && +value > finalLessOrEqual) {
        const msg = prepareMsg(message, 'lessThanOrEqualTo', {}).defaultMessage;
        return typeof msg === 'string' ? msg : typeof msg === 'function' ? msg(finalLessOrEqual) : String(msg);
      }

      if (even && trunc(+value) % 2) {
        return prepareMsg(message, 'even', {}).defaultMessage;
      }

      if (odd && !(trunc(+value) % 2)) {
        return prepareMsg(message, 'odd', {}).defaultMessage;
      }
    });
  }
);


const stringValidator = memoize(({ message }: ValidatorOptions = {}): ValidatorFunction => {
  return prepare((value: any) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      const error = value.find((item: any) => typeof item !== 'string');
      return error ? prepareMsg(message, 'mustBeString', {}).defaultMessage : undefined;
    }

    if (typeof value !== 'string') {
      return prepareMsg(message, 'mustBeString', {}).defaultMessage;
    }
  });
});

const booleanValidator = memoize(({ message }: ValidatorOptions = {}): ValidatorFunction =>
  prepare((value: any) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      const error = value.find((item: any) => typeof item !== 'boolean');
      return error ? prepareMsg(message, 'mustBeBool', {}).defaultMessage : undefined;
    }

    if (typeof value !== 'boolean') {
      return prepareMsg(message, 'mustBeBool', {}).defaultMessage;
    }
  })
);

type DataType = 'string' | 'integer' | 'boolean' | 'number' | 'float';

export const dataTypeValidator = (type: DataType) =>
  ({
    string: (options: ValidatorOptions = {}) => stringValidator({ message: 'Field value has to be string', ...options }),
    integer: (options: PatternOptions = {}) =>
      pattern({
        pattern: /^-?\d*$/,
        message: 'Value must be integer',
        ...options,
      }),
    boolean: (options: ValidatorOptions = {}) => booleanValidator({ message: 'Field value has to be boolean', ...options }),
    number: (options: PatternOptions = {}) =>
      pattern({
        pattern: /^-?\d*[.]{0,1}\d*$/,
        message: 'Values must be number',
        ...options,
      }),
    float: (options: PatternOptions = {}) =>
      pattern({
        pattern: /^-?\d*[.]{0,1}\d*$/,
        message: 'Values must be number',
        ...options,
      }),
  }[type]);

