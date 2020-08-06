import AnyObject from './any-object';

export type OnChangeEvent = React.ChangeEvent | any;

export interface UseSubscription {
  name: string;
  initialValue?: any;
  subscription?: AnyObject;
}

export default UseSubscription;
