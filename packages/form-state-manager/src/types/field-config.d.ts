import AnyObject from './any-object';
import { Subscription } from './use-field';
import { FieldRender } from './manager-api';
import { Validator } from './validate';

export type IsEqual = (a: any, b: any) => boolean;
export type AfterSubmit = () => void;
export type BeforeSubmit = () => void | false;

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
  data?: AnyObject;
  afterSubmit?: AfterSubmit;
  beforeSubmit?: BeforeSubmit;
  silent?: boolean;
}

export default FieldConfig;
