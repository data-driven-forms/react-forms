import AnyObject from './any-object';

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

export type OnChangeEvent = React.ChangeEvent | any;
export type SubscribtionData = [any, (value: OnChangeEvent) => void, (event: React.FocusEvent) => void, (event: React.FocusEvent) => void, Meta];

export interface UseSubscription {
  name: string;
  initialValue?: any;
  subscription?: AnyObject;
}

export default UseSubscription;
