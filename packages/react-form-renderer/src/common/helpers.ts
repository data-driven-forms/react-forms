/* eslint-disable no-unused-vars */
import { isValidElement, ReactNode, ReactElement } from 'react';
import Validators from '../validators';
import { ValidatorFunction } from '../validators';

const HAS_PROP = {}.hasOwnProperty;
export const TO_STRING = {}.toString;

const isObject = (obj: any): obj is object => typeof obj === 'object' && TO_STRING.call(obj) === '[object Object]' && obj !== null;

const stringify = (args: any): string => {
  let arr: any[] = [];
  let value: any;
  let options = args;
  if (typeof options === 'number') {
    options = options.toString();
  }

  for (let k in options) {
    if (HAS_PROP.call(options, k)) {
      value = options[k];
      arr.push(k, isValidElement(value) ? stringify(value.props) : isObject(value) ? stringify(value) : value != null ? value.toString() : 'undefined');
    }
  }

  return JSON.stringify(arr);
};

export const memoize = (func: Function): ValidatorFunction => {
  if (!(func as any).cache) {
    (func as any).cache = {};
  }

  return (value: any, allValues?: object, ...options: any[]) => {
    const key = stringify(value);
    return HAS_PROP.call((func as any).cache, key) ? (func as any).cache[key] : ((func as any).cache[key] = func(value, allValues, ...options));
  };
};

interface MessageObject {
  id?: string;
  defaultMessage: ReactNode | ((arg: any) => ReactNode);
  values: object;
}

const defaultMessage = (type: keyof typeof Validators.messages, values: object): MessageObject => {
  let msg = Validators.messages[type];
  return typeof msg === 'string' ? { defaultMessage: msg, values } : Object.assign({}, msg, { values }) as MessageObject;
};

export const prepareMsg = (msg: ReactNode | ((arg: any) => ReactNode), type: keyof typeof Validators.messages, values: object): MessageObject => {
  if (msg == null) {
    return defaultMessage(type, values);
  }

  let processedMsg: any = msg;

  if (HAS_PROP.call(processedMsg, 'props') && isValidElement(processedMsg)) {
    processedMsg = (processedMsg as ReactElement).props;
  }

  if ((processedMsg as any)[type] != null) {
    processedMsg = (processedMsg as any)[type];
  }

  if (isObject(processedMsg)) {
    if (HAS_PROP.call(processedMsg, 'id') || HAS_PROP.call(processedMsg, 'defaultMessage')) {
      return Object.assign({}, processedMsg, { values }) as MessageObject;
    }

    return defaultMessage(type, values);
  }

  return { id: processedMsg as string, defaultMessage: processedMsg as ReactNode, values };
};

export const assign = Object.assign;

export const prepare =
  (func: Function) =>
  (value: any, allValues?: object, ...args: any[]) =>
    func(value, allValues, ...args);

export const isNumber = (num: any): boolean => !isNaN(num) && (num !== 0 || ('' + num).trim() !== '');

export function selectNum(var1: any, var2?: any): number | null {
  return isNumber(var1) ? +var1 : arguments.length > 1 && isNumber(var2) ? +var2 : null;
}

export const trunc = (num: number): number => (Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num));
