import { createContext } from 'react';
import { ManagerContextValue } from '../types/form-manager-context';

const noop = () => {
  /**
   * empty function stub
   */
};

const FormManagerContext = createContext<ManagerContextValue>({
  values: {},
  dispatch: noop,
  handleSubmit: noop,
  registerField: noop,
  unRegisterField: noop,
  change: noop
});

export default FormManagerContext;
