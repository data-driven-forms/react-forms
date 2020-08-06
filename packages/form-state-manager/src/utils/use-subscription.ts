import { useEffect, useState, useContext } from 'react';
import FormManagerContext from '../files/form-manager-context';
import UseSubscription, { OnChangeEvent, SubscribtionData } from '../types/use-subscription';

const sanitizeValue = (event: OnChangeEvent): any => {
  if (Array.isArray(event)) {
    return event;
  }

  if (typeof event === 'object' && Object.prototype.hasOwnProperty.call(event, 'target')) {
    if (event?.target === null) {
      return event;
    }

    return event?.target.type === 'checkbox' ? event.target.checked : event?.target.value;
  }

  return event;
};

const useSubscription = ({ name, initialValue }: UseSubscription): SubscribtionData => {
  const { registerField, unregisterField, change } = useContext(FormManagerContext);
  const [state, setState] = useState({
    value: initialValue,
    name
  });

  const handleChange = (event: OnChangeEvent) => {
    const sanitizedValue = sanitizeValue(event);
    change(name, sanitizedValue);
    setState((prevState) => ({ ...prevState, value: sanitizedValue }));
  };

  const valueToReturn = state.value;

  useEffect(() => {
    registerField({ ...state });

    return () => {
      unregisterField(state);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (event: OnChangeEvent) => {
    try {
      event.persist();
      handleChange(event);
    } catch {
      handleChange(event);
    }
  };

  return [valueToReturn, onChange];
};

export default useSubscription;
