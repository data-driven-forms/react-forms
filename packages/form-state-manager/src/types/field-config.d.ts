import AnyObject from './any-object';
import { Subscription } from './use-subscription';

export interface FieldConfig extends AnyObject {
  name: string;
  value?: any;
  persistOnUnmount?: boolean;
  getFieldState?: () => AnyObject;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  subscription?: Subscription;
  internalId: number;
}

export default FieldConfig;
