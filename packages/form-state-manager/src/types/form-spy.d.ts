import { Subscription } from './use-subscription';
import { ManagerState } from './manager-api';

type Children = (props: ManagerState) => React.ReactElement;

export interface FormSpyProps {
  children: Children;
  subscription?: Subscription;
}

export default FormSpyProps;
