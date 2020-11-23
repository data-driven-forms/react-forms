import { useReducer, useContext, useState, useEffect } from 'react';
import FormManagerContext from './form-manager-context';
import generateId from '../utils/generate-id';
import FormSpyProps from '../types/form-spy';

const FormSpy: React.FunctionComponent<FormSpyProps> = ({ children, subscription = { all: true } }) => {
  const { subscribe, unsubscribe, getState, formOptions } = useContext(FormManagerContext);
  const [, rerender] = useReducer((prev) => prev + 1, 0);

  const [id] = useState(() => {
    const internalId = generateId();

    subscribe({ name: internalId, render: rerender, subscription });

    return internalId;
  });

  useEffect(
    () => () => {
      unsubscribe({ name: id });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return children({ ...getState(), form: formOptions });
};

export default FormSpy;
