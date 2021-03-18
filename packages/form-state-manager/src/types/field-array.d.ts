import AnyObject from './any-object';
import { UseFieldArrayConfig } from './use-field-array';

export interface FieldArrayProps extends UseFieldArrayConfig {
  children: (props: AnyObject) => React.ReactNode;
}

export default FieldArrayProps;
