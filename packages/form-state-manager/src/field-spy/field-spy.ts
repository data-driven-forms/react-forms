import React, { useReducer, useContext, useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import FormManagerContext from '../form-manager-context';
import generateId from '../generate-id';
import { ManagerState } from '../manager-api';
import { Subscription } from '../use-field';

interface ChildrenFieldSpyProps extends ManagerState {
  form: ManagerState;
}

type OnChange = (managerState: ChildrenFieldSpyProps) => void;

export interface FieldSpyProps {
  subscription?: Subscription;
  onChange?: OnChange;
  names: string[];
  children: (state: ManagerState) => React.ReactElement;
}

const FieldSpy: React.FC<FieldSpyProps> = ({ names, children, onChange, subscription }) => {
  const { subscribe, unsubscribe, getState, formOptions, batch } = useContext(FormManagerContext);
  const [, rerender] = useReducer((prev) => prev + 1, 0);

  const [id] = useState(() => {
    const internalId = generateId();

    batch(() => {
      names.forEach((name) => {
        subscribe({ name, internalId, render: rerender as () => void, subscription });
      });
    });

    return internalId;
  });

  useEffect(
    () => () => {
      batch(() => {
        names.forEach((name) => {
          unsubscribe({ name, internalId: id });
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const newState = { ...cloneDeep(getState()), form: formOptions };

  if (onChange) {
    onChange(newState);
    return null;
  }

  if (typeof children === 'function') {
    return children(newState);
  } else if (children) {
    // eslint-disable-next-line no-console
    console.error(`Children of FieldSpy has to be a function, you provided: ${typeof children}`);
  }

  return null;
};

export default FieldSpy;
