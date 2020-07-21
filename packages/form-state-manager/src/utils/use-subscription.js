import { useEffect, useState, useContext } from 'react';
import FormManagerContext from '../files/form-manager-context';

class FieldState {
  constructor(value) {
    this.value = value;
  }

  setValue = (value) => {
    this.value = value;
  };

  getFieldState = () => ({ value: this.value });
}

const sanitizeValue = (event) => {
  if (Array.isArray(event)) {
    return event;
  }

  if (typeof event === 'object' && Object.prototype.hasOwnProperty.call(event, 'target')) {
    if (event.target === null) {
      return event;
    }

    return event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  }

  return event;
};

const useSubscription = ({ name, initialValue, subscription = {} }) => {
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

  const handleChange = (event) => {
    const sanitizedValue = sanitizeValue(event);
    setState((prevState) => ({ ...prevState, value: sanitizedValue }));
    state.fieldState.setValue(sanitizedValue);
  };

  let valueToReturn = state.value;

  useEffect(() => {
    registerField(dispatch, { ...state, getFieldState: state.fieldState.getFieldState });

    return () => {
      unRegisterField(dispatch, state);
    };
  }, []);

  const onChange = (event) => {
    try {
      event.persist();
      return handleChange(event);
    } catch {
      return handleChange(event);
    }
  };

  return [valueToReturn, onChange];
};

export default useSubscription;
