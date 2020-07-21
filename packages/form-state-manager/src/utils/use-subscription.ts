import { useEffect, useState, useContext } from 'react';
import FormManagerContext, { ManagerContextValue } from '../files/form-manager-context';
import AnyObject from '../files/any-object';
import { object } from 'prop-types';

// tslint:disable-next-line: no-any-union
type OnChangeEvent = React.ChangeEvent | any;

class FieldState {
  constructor(public value: any) {
    this.value = value;
  }

  setValue = (value: any) => {
    this.value = value;
  };

  getFieldState = () => ({ value: this.value });
}

const sanitizeValue = (event: OnChangeEvent) => {
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

interface UseSubscriotion {
  name: string;
  initialValue?: any;
  subscription?: AnyObject;
}

const useSubscription = ({ name, initialValue, subscription = {} }: UseSubscriotion) => {
  const { registerField, unRegisterField, dispatch } = useContext(FormManagerContext);
  const [state, setState] = useState({
    value: initialValue,
    name,
    /**
     * We need this to send field values and state if the field is not subscribed to every event
     * We pass the getFieldState function reference to the state manager and it will retrieve field data on demmand
     * This way we don't have to mutate the manager context on each field render and render only changed fields when necessary
     */
    fieldState: new FieldState(initialValue) // TODO update the whole field state inside the instance
  });

  const handleChange = (event: OnChangeEvent) => {
    const sanitizedValue = sanitizeValue(event);
    setState((prevState) => ({ ...prevState, value: sanitizedValue }));
    state.fieldState.setValue(sanitizedValue);
  };

  const valueToReturn = state.value;

  useEffect(() => {
    registerField(dispatch, { ...state, getFieldState: state.fieldState.getFieldState });

    return () => {
      unRegisterField(dispatch, state);
    };
  }, []);

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
