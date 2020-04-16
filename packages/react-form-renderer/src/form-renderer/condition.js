import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import lodashIsEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import useFormApi from '../files/use-form-api';

const isEmptyValue = (value) => (typeof value === 'number' || value === true ? false : lodashIsEmpty(value));

const fieldCondition = (value, { is, isNotEmpty, isEmpty, pattern, notMatch, flags }) => {
  if (isNotEmpty) {
    return !isEmptyValue(value);
  }

  if (isEmpty) {
    return isEmptyValue(value);
  }

  if (pattern) {
    const regExpPattern = RegExp(pattern, flags);

    return notMatch ? !regExpPattern.test(value) : regExpPattern.test(value);
  }

  const isMatched = Array.isArray(is) ? !!is.includes(value) : value === is;

  return notMatch ? !isMatched : isMatched;
};

export const parseCondition = (condition, values) => {
  let positiveResult = {
    visible: true,
    ...condition.then,
    result: true
  };

  let negativeResult = {
    visible: false,
    ...condition.else,
    result: false
  };

  if (Array.isArray(condition)) {
    return !condition.map((condition) => parseCondition(condition, values)).some(({ result }) => result === false) ? positiveResult : negativeResult;
  }

  if (condition.and) {
    return !condition.and.map((condition) => parseCondition(condition, values)).some(({ result }) => result === false)
      ? positiveResult
      : negativeResult;
  }

  if (condition.sequence) {
    return condition.sequence.reduce(
      (acc, curr) => {
        const result = parseCondition(curr, values);

        return {
          sets: [...acc.sets, ...(result.set ? [result.set] : [])],
          visible: acc.visible || result.visible,
          result: acc.result || result.result
        };
      },
      { ...negativeResult, sets: [] }
    );
  }

  if (condition.or) {
    return condition.or.map((condition) => parseCondition(condition, values)).some(({ result }) => result === true) ? positiveResult : negativeResult;
  }

  if (condition.not) {
    return !parseCondition(condition.not, values).result ? positiveResult : negativeResult;
  }

  if (typeof condition.when === 'string') {
    return fieldCondition(get(values, condition.when), condition) ? positiveResult : negativeResult;
  }

  if (Array.isArray(condition.when)) {
    return condition.when.map((fieldName) => fieldCondition(get(values, fieldName), condition)).find((condition) => !!condition)
      ? positiveResult
      : negativeResult;
  }

  return negativeResult;
};

const Condition = React.memo(
  ({ condition, children, values }) => {
    const formOptions = useFormApi();
    const dirty = formOptions.getState().dirty;

    const [lastSets, setSets] = React.useState([]);
    const [initial, setInitial] = React.useState(true);

    const conditionResult = parseCondition(condition, values, formOptions);
    const setters = conditionResult.set ? [conditionResult.set] : conditionResult.sets;

    useEffect(() => {
      if (!dirty) {
        setInitial(true);
      }
    }, [dirty]);

    useEffect(() => {
      if (setters && setters.length > 0 && (initial || !isEqual(setters, lastSets))) {
        setters.forEach((setter, index) => {
          if (setter && (initial || !isEqual(setter, lastSets[index]))) {
            setTimeout(() => {
              formOptions.batch(() => {
                Object.entries(setter).forEach(([name, value]) => {
                  formOptions.change(name, value);
                });
              });
            });
          }
        });
        setSets(setters);
        setInitial(false);
      }
    }, [setters, initial]);

    return conditionResult.visible ? children : null;
  },
  (a, b) => isEqual(a.values, b.values) && isEqual(a.condition, b.condition)
);

const conditionProps = {
  when: PropTypes.string,
  is: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.bool]),
  isNotEmpty: PropTypes.bool,
  isEmpty: PropTypes.bool,
  pattern: PropTypes.oneOf([PropTypes.string, PropTypes.instanceOf(RegExp)]),
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
  values: PropTypes.object.isRequired
};

export default Condition;
