import AnyObject from './any-object';
import { Subscription } from './use-subscription';
import { FieldRender } from './manager-api';
import { Validator } from './validate';

export type IsEqual = (a: any, b: any) => boolean;

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
  validate?: Validator;
  isEqual?: IsEqual;
  validateFields?: Array<string>;
  initialValue?: any;
  defaultValue?: any;
}

export default FieldConfig;
