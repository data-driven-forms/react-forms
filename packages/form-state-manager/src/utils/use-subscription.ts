import { useEffect, useState, useContext, useRef } from 'react';
import FormManagerContext from '../files/form-manager-context';
import UseSubscription, { OnChangeEvent, SubscribtionData } from '../types/use-subscription';
import AnyObject from '../types/any-object';

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

const createFieldState = (initialState: AnyObject) => {
  let state = initialState;
  const setDetachedState = (newState: AnyObject) => {
    state = newState;
  };

  const getDetachedState = (): AnyObject => state;
  return {
    setDetachedState,
    getDetachedState
  };
};

const useSubscription = ({ name, initialValue }: UseSubscription): SubscribtionData => {
  const { registerField, unregisterField, change, getFieldValue, blur, focus } = useContext(FormManagerContext);
  const [state, setState] = useState({
    value: initialValue,
    name
  });
  const {
    current: { getDetachedState, setDetachedState }
  } = useRef(createFieldState(state));

  /**
   * update detached state on each render
   */
  setDetachedState(state);

  const handleChange = (event: OnChangeEvent) => {
    const sanitizedValue = sanitizeValue(event);
    change(name, sanitizedValue);
    setState((prevState) => ({ ...prevState, value: getFieldValue(name) }));
  };

  const valueToReturn = state.value;

  useEffect(() => {
    registerField({ ...state, getFieldState: getDetachedState });

    return () => {
      unregisterField({ ...state, getFieldState: getDetachedState });
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

  return [valueToReturn, onChange, () => focus(name), () => blur(name)];
};

export default useSubscription;
