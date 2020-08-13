import AnyObject from './any-object';
import { Subscription } from './use-subscription';
import { FieldRender } from './manager-api';

export interface FieldConfig extends AnyObject {
  name: string;
  value?: any;
  persistOnUnmount?: boolean;
  getFieldState?: () => AnyObject;
  clearOnUnmount?: boolean;
  initializeOnMount?: boolean;
  subscription?: Subscription;
  internalId: number | string;
  render: FieldRender;
}

export default FieldConfig;
