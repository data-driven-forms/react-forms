import { createContext, FormEvent } from 'react';
import AnyObject from '../any-object';
import FieldConfig from '../field-config';
import createManagerApi from '../manager-api';
import { Batch, Blur, Change, Focus, GetState, ManagerState, Subscribe, Unsubscribe, UpdateFieldConfig } from '../manager-api';
import { FieldArrayApi } from '../use-field-array';

export interface Action extends AnyObject {
  type: string;
}

export interface ManagerContextValue extends FieldArrayApi {
  batch: Batch;
  handleSubmit: (event: FormEvent) => void;
  registerField: (fieldState: FieldConfig) => void;
  unregisterField: (fieldState: Omit<FieldConfig, 'render'>) => void;
  change: Change;
  getState: GetState;
  formOptions: ManagerState;
  getFieldValue: (name: string) => any;
  getFieldState: (name: string) => AnyObject | undefined;
  blur: Blur;
  focus: Focus;
  clearedValue?: any;
  initialValues?: AnyObject;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  updateFieldConfig: UpdateFieldConfig;
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
  })(),
  getFieldValue: noop,
  getFieldState: () => undefined,
  blur: noop,
  focus: noop,
  initialValues: {},
  subscribe: noop,
  unsubscribe: noop,
  concat: noop,
  forEach: noop,
  insert: noop,
  map: () => [],
  move: noop,
  pop: noop,
  push: noop,
  remove: noop,
  removeBatch: noop,
  shift: noop,
  swap: noop,
  unshift: noop,
  update: noop,
  updateFieldConfig: noop
});

export default FormManagerContext;
