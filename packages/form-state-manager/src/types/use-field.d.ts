import { Validator } from './validate';
import { DataType } from './data-types';
import AnyObject from './any-object';

export interface Subscription {
  active?: boolean;
  dirty?: boolean;
  dirtySinceLastSubmit?: boolean;
  invalid?: boolean;
  modified?: boolean;
  modifiedSinceLastSubmit?: boolean;
  pristine?: boolean;
  submitFailed?: boolean;
  submitting?: boolean;
  touched?: boolean;
  valid?: boolean;
  validating?: boolean;
  visited?: boolean;
}

export interface Meta {
  active: boolean;
  data: any;
  dirty: boolean;
  dirtySinceLastSubmit: boolean;
  error: any;
  initial: any;
  invalid: boolean;
  modified: boolean;
  modifiedSinceLastSubmit: boolean;
  pristine: boolean;
  submitError: any;
  submitFailed: boolean;
  submitSucceeded: boolean;
  submitting: boolean;
  touched: boolean;
  valid: boolean;
  validating: boolean;
  visited: boolean;
}

export type OnChange = (value: any) => void;
export type OnBlur = (value: any) => void;
export type OnFocus = (value: any) => void;

export interface Input {
  value: any;
  checked?: boolean;
  onChange: OnChange;
  onBlur: OnBlur;
  onFocus: OnFocus;
  multiple?: boolean;
  name: string;
}

export type OnChangeEvent = React.ChangeEvent | any;

export interface UseFieldData extends AnyObject {
  input: Input;
  meta: Meta;
}

export interface UseField extends AnyObject {
  name: string;
  initialValue?: any;
  subscription?: Subscription;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  validate?: Validator;
  clearedValue?: any;
  dataType?: DataType;
}

export default UseField;
