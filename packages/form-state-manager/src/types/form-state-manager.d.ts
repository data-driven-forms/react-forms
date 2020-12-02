import AnyObject from './any-object';
import { Subscription } from './use-field';
import { FormValidator } from './validate';
import { Debug } from './manager-api';

export interface FormStateManagerProps {
  onSubmit: (values: AnyObject) => void;
  children?: (props: AnyObject) => React.ReactNode;
  render?: (props: AnyObject) => React.ReactNode;
  clearOnUnmount?: boolean;
  subscription?: Subscription;
  clearedValue?: any;
  initialValues?: AnyObject;
  initializeOnMount?: boolean;
  validate?: FormValidator;
  debug?: Debug;
}

export default FormStateManagerProps;
