import AnyObject from './any-object';
import UseField from './use-field';

export interface FieldProps extends UseField {
  children: (props: AnyObject) => React.ReactNode;
  component: React.ComponentType<AnyObject> | 'input' | 'select' | 'textarea';
  ref: React.Ref<any>;
  render: (props: AnyObject) => React.ReactNode;
}

export default FieldProps;
