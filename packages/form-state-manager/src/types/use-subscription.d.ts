import AnyObject from './any-object';

export type OnChangeEvent = React.ChangeEvent | any;
export type SubscribtionData = [any, (value: OnChangeEvent) => void, (event: React.FocusEvent) => void, (event: React.FocusEvent) => void];

export interface UseSubscription {
  name: string;
  initialValue?: any;
  subscription?: AnyObject;
}

export default UseSubscription;
