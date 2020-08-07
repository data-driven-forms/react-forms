import AnyObject from './any-object';

export interface FieldConfig extends AnyObject {
  name: string;
  value?: any;
  persistOnUnmount?: boolean;
  getFieldState?: () => AnyObject;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
}

export default FieldConfig;
