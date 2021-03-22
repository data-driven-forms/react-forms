import { useReducer, useContext, useState, useEffect } from 'react';
import FormManagerContext from '../form-manager-context';
import generateId from '../generate-id';
import { ManagerState } from '../manager-api';
import { Subscription } from '../use-field';

interface ChildrenFormSpyProps extends ManagerState {
  form: ManagerState;
}

type OnChange = (managerState: ChildrenFormSpyProps) => void;
export interface FormSpyProps {
  subscription?: Subscription;
  onChange?: OnChange;
}

const FormSpy: React.FunctionComponent<FormSpyProps> = ({ children, onChange, subscription = { all: true } }) => {
  const { subscribe, unsubscribe, getState, formOptions } = useContext(FormManagerContext);
  const [, rerender] = useReducer((prev) => prev + 1, 0);

  const [id] = useState(() => {
    const internalId = generateId();

    subscribe({ name: internalId, render: rerender as () => void, subscription });

    return internalId;
  });

  useEffect(
    () => () => {
      unsubscribe({ name: id });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const newState = { ...getState(), form: formOptions };

  if (onChange) {
    onChange(newState);
    return null;
  }

  if (typeof children === 'function') {
    return children(newState);
  }

  return null;
};

export default FormSpy;
