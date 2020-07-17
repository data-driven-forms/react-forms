import React, {useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import lodashIsEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

const isEmptyValue = value =>
  typeof value === 'number' || value === true ? false : lodashIsEmpty(value);

const fieldCondition = (value, {is, isNotEmpty, isEmpty, pattern, notMatch, flags}) => {
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
  //Positive result is alwaus a triggering condition
  //since a the clause always exists
  let positiveResult = {
    uiState: {
      add: condition.then,
      remove: condition.else,
    },
    triggered: true,
  };

  //if else clause exists, this is a triggered condition
  //if no else clause exists, this is a non-triggering condition
  let negativeResult = {
    uiState: {
      add: condition.else,
      remove: condition.then,
    },
    triggered: condition.else ? true : false,
  };

  if (Array.isArray(condition)) {
    return !condition
      .map(condition => parseCondition(condition, values))
      .some(({triggered}) => triggered === false)
      ? positiveResult
      : negativeResult;
  }

  if (condition.and) {
    return !condition.and
      .map(condition => parseCondition(condition, values))
      .some(({triggered}) => triggered === false)
      ? positiveResult
      : negativeResult;
  }

  if (condition.or) {
    return condition.or
      .map(condition => parseCondition(condition, values))
      .some(({triggered}) => triggered === true)
      ? positiveResult
      : negativeResult;
  }

  if (condition.not) {
    return !parseCondition(condition.not, values).triggered ? positiveResult : negativeResult;
  }

  if (typeof condition.when === 'string') {
    return fieldCondition(get(values, condition.when), condition) ? positiveResult : negativeResult;
  }

  if (Array.isArray(condition.when)) {
    return condition.when
      .map(fieldName => fieldCondition(get(values, fieldName), condition))
      .find(condition => !!condition)
      ? positiveResult
      : negativeResult;
  }

  return negativeResult;
};

const conditionProps = {
  when: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  is: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
  ]),
  isNotEmpty: PropTypes.bool,
  isEmpty: PropTypes.bool,
  pattern: (props, name, componentName) => {
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
    set: PropTypes.object,
  }),
  else: PropTypes.shape({
    visible: PropTypes.bool,
    set: PropTypes.object,
  }),
};

const nestedConditions = {
  or: PropTypes.oneOfType([
    PropTypes.shape(conditionProps),
    PropTypes.arrayOf(PropTypes.shape(conditionProps)),
  ]),
  and: PropTypes.oneOfType([
    PropTypes.shape(conditionProps),
    PropTypes.arrayOf(PropTypes.shape(conditionProps)),
  ]),
  not: PropTypes.oneOfType([
    PropTypes.shape(conditionProps),
    PropTypes.arrayOf(PropTypes.shape(conditionProps)),
  ]),
  sequence: PropTypes.arrayOf(PropTypes.shape(conditionProps)),
};

const conditionsProps = {
  ...conditionProps,
  ...nestedConditions,
};
