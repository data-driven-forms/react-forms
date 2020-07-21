import { createContext, FormEvent } from 'react';
import AnyObject from '../utils/any-object';

export interface Action extends AnyObject {
  type: string;
}

export interface ManagerContextValue {
  values: AnyObject;
  dispatch: (action: Action) => void;
  handleSubmit: (event: FormEvent) => void;
  registerField: (dispatch: (action: Action) => void, fieldState: AnyObject) => void;
  unRegisterField: (dispatch: (action: Action) => void, fieldState: AnyObject) => void;
}

export interface ManagerContext {
  value: ManagerContextValue;
}

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
});

export default FormManagerContext;
