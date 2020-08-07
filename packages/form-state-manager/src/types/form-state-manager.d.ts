import AnyObject from './any-object';

export interface FormStateManagerProps {
  onSubmit: (values: AnyObject) => void;
  children: (props: AnyObject) => React.ReactNode;
  clearOnUnmount?: boolean;
}

export default FormStateManagerProps;
