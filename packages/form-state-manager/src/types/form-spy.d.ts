import { Subscription } from './use-field';
import { ManagerState } from './manager-api';

interface ChildrenFormSpyProps extends ManagerState {
  form: ManagerState;
}

type Children = (props: ChildrenFormSpyProps) => React.ReactElement;

type OnChange = (managerState: ChildrenFormSpyProps) => void;
export interface FormSpyProps {
  children: Children;
  subscription?: Subscription;
  onChange?: OnChange;
}

export default FormSpyProps;
