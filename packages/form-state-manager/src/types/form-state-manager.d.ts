import AnyObject from './any-object';
import { Subscription } from './use-subscription';

export interface FormStateManagerProps {
  onSubmit: (values: AnyObject) => void;
  children: (props: AnyObject) => React.ReactNode;
  clearOnUnmount?: boolean;
  subscription?: Subscription;
  clearedValue?: any;
}

export default FormStateManagerProps;
