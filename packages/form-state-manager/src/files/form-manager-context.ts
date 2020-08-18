import { createContext } from 'react';
import { ManagerContextValue } from '../types/form-manager-context';
import createManagerApi from '../utils/manager-api';

const noop = () => {
  /**
   * empty function stub
   */
};

const FormManagerContext = createContext<ManagerContextValue>({
  batch: noop,
  handleSubmit: noop,
  registerField: noop,
  unregisterField: noop,
  change: noop,
  getState: createManagerApi({
    onSubmit: noop
  }),
  formOptions: createManagerApi({
    onSubmit: noop
  }),
  getFieldValue: noop,
  getFieldState: () => undefined,
  blur: noop,
  focus: noop,
  initialValues: {},
  subscribe: noop,
  unsubscribe: noop
});

export default FormManagerContext;
