import AnyObject from './any-object';

export interface FieldState extends AnyObject {
  name: string;
  value: any;
  persistOnUnmount?: boolean;
}

export default FieldState;
