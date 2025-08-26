/* eslint-disable no-unused-vars */
import { isValidElement } from 'react';
import Validators from '../validators';

const HAS_PROP = {}.hasOwnProperty;
export const TO_STRING = {}.toString;

const isObject = (obj) => typeof obj === 'object' && TO_STRING.call(obj) === '[object Object]' && obj !== null;

const stringify = (value) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return JSON.stringify(value);
};

export const memoize = (func) => {
  if (!func.cache) {
    func.cache = {};
  }

  return (value, allValues, ...options) => {
    const key = stringify(allValues);
    return HAS_PROP.call(func.cache, key) ? func.cache[key] : (func.cache[key] = func(value, allValues, ...options));
  };
};

const defaultMessage = (type, values) => {
  let msg = Validators.messages[type];
  return typeof msg === 'string' ? { defaultMessage: msg, values } : Object.assign({}, msg, { values });
};

export const prepareMsg = (msg, type, values) => {
  if (msg == null) {
    return defaultMessage(type, values);
  }

  if (HAS_PROP.call(msg, 'props') && isValidElement(msg)) {
    msg = msg.props;
  }

  if (msg[type] != null) {
    msg = msg[type];
  }

  if (isObject(msg)) {
    if (HAS_PROP.call(msg, 'id') || HAS_PROP.call(msg, 'defaultMessage')) {
      return Object.assign({}, msg, { values });
    }

    return defaultMessage(type, values);
  }

  return { id: msg, defaultMessage: msg, values };
};

export const assign = Object.assign;

export const prepare =
  (func) =>
  (value, allValues, ...args) =>
    func(value, allValues, ...args);

export const isNumber = (num) => !isNaN(num) && (num !== 0 || ('' + num).trim() !== '');

export function selectNum(var1, var2) {
  return isNumber(var1) ? +var1 : arguments.length > 1 && isNumber(var2) ? +var2 : null;
}

export const trunc = (num) => (Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num));
