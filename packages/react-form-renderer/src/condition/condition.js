import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import useFormApi from '../use-form-api';
import parseCondition from '../parse-condition';

export const reducer = (state, { type, sets }) => {
  switch (type) {
    case 'formResetted':
      return {
        ...state,
        initial: true
      };
    case 'rememberSets':
      return {
        ...state,
        initial: false,
        sets
      };
    default:
      return state;
  }
};

const Condition = React.memo(
  ({ condition, children, values, field }) => {
    const formOptions = useFormApi();
    const dirty = formOptions.getState().dirty;

    const [state, dispatch] = useReducer(reducer, {
      sets: [],
      initial: true
    });

    const conditionResult = parseCondition(condition, values, field);
    const setters = conditionResult.set ? [conditionResult.set] : conditionResult.sets;

    useEffect(() => {
      if (!dirty) {
        dispatch({ type: 'formResetted' });
      }
    }, [dirty]);

    useEffect(() => {
      if (setters && setters.length > 0 && (state.initial || !isEqual(setters, state.sets))) {
        setters.forEach((setter, index) => {
          if (setter && (state.initial || !isEqual(setter, state.sets[index]))) {
            setTimeout(() => {
              formOptions.batch(() => {
                Object.entries(setter).forEach(([name, value]) => {
                  formOptions.change(name, value);
                });
              });
            });
          }
        });
        dispatch({ type: 'rememberSets', sets: setters });
      }
    }, [setters, state.initial]);

    return conditionResult.visible ? children : null;
  },
  (a, b) => isEqual(a.values, b.values) && isEqual(a.condition, b.condition)
);

const conditionProps = {
  when: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  is: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.bool]),
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
    set: PropTypes.object
  }),
  else: PropTypes.shape({
    visible: PropTypes.bool,
    set: PropTypes.object
  })
};

const nestedConditions = {
  or: PropTypes.oneOfType([PropTypes.shape(conditionProps), PropTypes.arrayOf(PropTypes.shape(conditionProps))]),
  and: PropTypes.oneOfType([PropTypes.shape(conditionProps), PropTypes.arrayOf(PropTypes.shape(conditionProps))]),
  not: PropTypes.oneOfType([PropTypes.shape(conditionProps), PropTypes.arrayOf(PropTypes.shape(conditionProps))]),
  sequence: PropTypes.arrayOf(PropTypes.shape(conditionProps))
};

const conditionsProps = {
  ...conditionProps,
  ...nestedConditions
};

Condition.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.shape(conditionsProps), PropTypes.arrayOf(PropTypes.shape(conditionsProps))]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  values: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired
};

export default Condition;
