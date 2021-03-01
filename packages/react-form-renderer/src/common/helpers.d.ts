import { ValidatorFunction, MessageTypes } from "../validators";
import { ReactNode } from "react";

// tslint:disable-next-line: ban-types
export function memoize(func: Function): ValidatorFunction;

export interface MessageObject {
  msg?: ReactNode;
  defaultMessage: ReactNode;
  values: object;
}

export function prepareMsg(msg: ReactNode, type: MessageTypes, values: object): MessageObject;
