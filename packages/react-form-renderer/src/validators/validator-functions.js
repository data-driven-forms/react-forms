import { memoize, prepare, prepareMsg, selectNum, isNumber, trunc } from '../common/helpers';

export const required = memoize(({ message } = {}) => {
  return prepare((value) => {
    const cond = typeof value === 'string' ? !value.trim() : value && !isNaN(value.length) ? !value.length : !value;
    if (cond) {
      return prepareMsg(message, 'required').defaultMessage;
    }
  });
});

export const length = memoize(({ '=': equal, is, max, maximum, min, minimum, message } = {}) => {
  equal = selectNum(equal, is);
  min = selectNum(min, minimum);
  max = selectNum(max, maximum);
  return prepare((value) => {
    if (!value) {
      return;
    }

    if (equal !== null && value.length !== equal) {
      const msg = prepareMsg(message, 'wrongLength', { count: equal }).defaultMessage;
      return typeof msg === 'string' ? msg : msg(equal);
    }

    if (max !== null && value.length > max) {
      const msg = prepareMsg(message, 'tooLong', { count: max }).defaultMessage;
      return typeof msg === 'string' ? msg : msg(max);
    }

    if (min !== null && value.length < min) {
      const msg = prepareMsg(message, 'tooShort', { count: min }).defaultMessage;
      return typeof msg === 'string' ? msg : msg(min);
    }
  });
});

export const pattern = memoize(({ pattern, message, flags } = {}) => {
  const verifiedPattern = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern;
  return prepare((value) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      const error = value.find((item) => {
        const parsedValue =
          typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'value')
            ? item.value.toString()
            : typeof item === 'string'
            ? item
            : item.toString();
        return pattern && !parsedValue.match(verifiedPattern);
      });
      const msg = prepareMsg(message, 'pattern').defaultMessage;
      return error ? (typeof msg === 'string' ? msg : msg(pattern)) : undefined;
    }

    const parsedValue = typeof value === 'string' ? value : value.toString();
    if (pattern && !parsedValue.match(verifiedPattern)) {
      const msg = prepareMsg(message, 'pattern').defaultMessage;
      return typeof msg === 'string' ? msg : msg(pattern);
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
  } = {}) => {
    equal = selectNum(equal, equalTo);
    diff = selectNum(diff, otherThan);
    greater = selectNum(greater, greaterThan);
    greaterOrEqual = selectNum(greaterOrEqual, greaterThanOrEqualTo);
    less = selectNum(less, lessThan);
    lessOrEqual = selectNum(lessOrEqual, lessThanOrEqualTo);

    return prepare((value) => {
      if (value === null || value === undefined) {
        return;
      }

      if (!isNumber(value)) {
        return prepareMsg(null, 'notANumber').defaultMessage;
      }

      if (equal !== null && +value !== equal) {
        const msg = prepareMsg(message, 'equalTo').defaultMessage;
        return typeof msg === 'string' ? msg : msg(equal);
      }

      if (diff !== null && +value === diff) {
        const msg = prepareMsg(message, 'otherThan').defaultMessage;
        return typeof msg === 'string' ? msg : msg(diff);
      }

      if (greater !== null && +value <= greater) {
        const msg = prepareMsg(message, 'greaterThan').defaultMessage;
        return typeof msg === 'string' ? msg : msg(greater);
      }

      if (greaterOrEqual !== null && +value < greaterOrEqual) {
        const msg = prepareMsg(message, 'greaterThanOrEqualTo').defaultMessage;
        return typeof msg === 'string' ? msg : msg(greaterOrEqual);
      }

      if (less !== null && +value >= less) {
        const msg = prepareMsg(message, 'lessThan').defaultMessage;
        return typeof msg === 'string' ? msg : msg(less);
      }

      if (lessOrEqual !== null && +value > lessOrEqual) {
        const msg = prepareMsg(message, 'lessThanOrEqualTo').defaultMessage;
        return typeof msg === 'string' ? msg : msg(lessOrEqual);
      }

      if (even && trunc(+value) % 2) {
        return prepareMsg(message, 'even').defaultMessage;
      }

      if (odd && !(trunc(+value) % 2)) {
        return prepareMsg(message, 'odd').defaultMessage;
      }
    });
  }
);

const stringValidator = memoize(({ message } = {}) => {
  return prepare((value) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      const error = value.find((item) => typeof item !== 'string');
      return error ? prepareMsg(message, 'mustBeString').defaultMessage : undefined;
    }

    if (typeof value !== 'string') {
      return prepareMsg(message, 'mustBeString').defaultMessage;
    }
  });
});

const booleanValidator = memoize(({ message } = {}) =>
  prepare((value) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      const error = value.find((item) => typeof item !== 'boolean');
      return error ? prepareMsg(message, 'mustBeBool').defaultMessage : undefined;
    }

    if (typeof value !== 'boolean') {
      return prepareMsg(message, 'mustBeBool').defaultMessage;
    }
  })
);

export const dataTypeValidator = (type) =>
  ({
    string: (options) => stringValidator({ message: 'Field value has to be string', ...options }),
    integer: (options) =>
      pattern({
        pattern: /^-?\d*$/,
        message: 'Value must be integer',
        ...options,
      }),
    boolean: (options) => booleanValidator({ message: 'Field value has to be boolean', ...options }),
    number: (options) =>
      pattern({
        pattern: /^-?\d*[.]{0,1}\d*$/,
        message: 'Values must be number',
        ...options,
      }),
    float: (options) =>
      pattern({
        pattern: /^-?\d*[.]{0,1}\d*$/,
        message: 'Values must be number',
        ...options,
      }),
  }[type]);
