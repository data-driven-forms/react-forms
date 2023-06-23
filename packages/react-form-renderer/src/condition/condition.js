import { useCallback, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import useFormApi from '../use-form-api';
import parseCondition from '../parse-condition';

const setterValueCheck = (setterValue) => {
  if (setterValue === null || Array.isArray(setterValue)) {
    console.error('Received invalid setterValue. Expected object, received: ', setterValue);

    return false;
  }

  return typeof setterValue === 'object';
};

export const reducer = (state, { type, sets }) => {
  switch (type) {
    case 'formResetted':
      return {
        ...state,
        initial: true,
      };
    case 'rememberSets':
      return {
        ...state,
        initial: false,
        sets,
      };
    default:
      return state;
  }
};

const Condition = ({ condition, children, field }) => {
  const formOptions = useFormApi();
  const formState = formOptions.getState();

  const [state, dispatch] = useReducer(reducer, {
    sets: [],
    initial: true,
  });

  // It is required to get the context state values from in order to get the latest state.
  // Using the trigger values can cause issues with the radio field as each input is registered separately to state and does not yield the actual field value.
  const conditionResult = useMemo(() => parseCondition(condition, formState.values, field), [formState.values, condition, field]);

  const setters = conditionResult.set ? [conditionResult.set] : conditionResult.sets;

  useEffect(() => {
    if (!formState.dirty) {
      dispatch({ type: 'formResetted' });
    }
  }, [formState.dirty]);

  const setValue = useCallback((setter) => {
    Object.entries(setter).forEach(([name, value]) => {
      formOptions.change(name, value);
    });
  }, []);

  useEffect(() => {
    if (setters && setters.length > 0 && (state.initial || !isEqual(setters, state.sets))) {
      setters.forEach((setter, index) => {
        if (setter && (state.initial || !isEqual(setter, state.sets[index]))) {
          setTimeout(() => {
            /**
             * We have to get the meta in the timetout to wait for state initialization
             */
            const meta = formOptions.getFieldState(field.name);
            const isFormModified = Object.values(formOptions.getState().modified).some(Boolean);
            /**
             * Apply setter only
             *    - field has no initial value
             *    - form is modified
             *    - when meta is false = field was unmounted before timeout, we finish the condition
             */
            if (!meta || isFormModified || typeof meta.initial === 'undefined') {
              formOptions.batch(() => {
                if (typeof setter !== 'function') {
                  setValue(setter);
                } else {
                  const setterValue = setter(formOptions.getState(), formOptions.getFieldState);

                  if (setterValueCheck(setterValue)) {
                    setValue(setterValue);
                  } else {
                    console.error('Received invalid setterValue. Expected object, received: ', setterValue);
                  }
                }
              });
            }
          });
        }
      });
      dispatch({ type: 'rememberSets', sets: setters });
    }
  }, [setters, state.initial]);

  return conditionResult.visible ? children : null;
};

const conditionProps = {
  when: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  is: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.bool, PropTypes.func]),
  isNotEmpty: PropTypes.bool,
  isEmpty: PropTypes.bool,
  pattern: (props, name, componentName) => {
    if (!props[name]) {
      return;
    }

    if (typeof props[name] === 'string') {
      return;
    }

    if (props[name] instanceof RegExp) {
      return;
    }

    return new Error(`Invalid prop pattern supplied to condition in \`${componentName}\`. Validation failed.
    pattern has to be RegExp or string. Received \`${typeof props[name]}\`.`);
  },
  notMatch: PropTypes.any,
  then: PropTypes.shape({
    visible: PropTypes.bool,
    set: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }),
  else: PropTypes.shape({
    visible: PropTypes.bool,
    set: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }),
};

const nestedConditions = {
  or: PropTypes.oneOfType([PropTypes.shape(conditionProps), PropTypes.arrayOf(PropTypes.shape(conditionProps))]),
  and: PropTypes.oneOfType([PropTypes.shape(conditionProps), PropTypes.arrayOf(PropTypes.shape(conditionProps))]),
  not: PropTypes.oneOfType([PropTypes.shape(conditionProps), PropTypes.arrayOf(PropTypes.shape(conditionProps))]),
  sequence: PropTypes.arrayOf(PropTypes.shape(conditionProps)),
};

const conditionsProps = {
  ...conditionProps,
  ...nestedConditions,
};

Condition.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.shape(conditionsProps), PropTypes.arrayOf(PropTypes.shape(conditionsProps))]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  values: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
};

export default Condition;
