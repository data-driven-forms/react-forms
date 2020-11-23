import { Subscription } from './use-field';
import { ManagerState } from './manager-api';

interface ChildrenFormSpyProps extends ManagerState {
  form: ManagerState;
}

type Children = (props: ChildrenFormSpyProps) => React.ReactElement;

export interface FormSpyProps {
  children: Children;
  subscription?: Subscription;
}

export default FormSpyProps;
