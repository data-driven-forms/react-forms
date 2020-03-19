import React from 'react';
import PropTypes from 'prop-types';
import lodashIsEmpty from 'lodash/isEmpty';
import { FormSpy } from 'react-final-form';
import get from 'lodash/get';

const isEmptyValue = (value) => typeof value === 'number' || value === true ? false : lodashIsEmpty(value);

const fieldCondition = (value, { is, isNotEmpty, isEmpty, pattern, notMatch, flags }) => {
  if (isNotEmpty){
    return !isEmptyValue(value);
  }

  if (isEmpty){
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
  if (Array.isArray(condition)) {
    return !condition.map((condition) => parseCondition(condition, values)).some(result => result === false);
  }

  if (condition.and) {
    return condition.and.map((condition) => parseCondition(condition, values)).every(result => result === true);
  }

  if (condition.or) {
    return condition.or.map((condition) => parseCondition(condition, values)).some(result => result === true);
  }

  if (condition.not) {
    return !parseCondition(condition.not, values);
  }

  if (typeof condition.when === 'string') {
    return fieldCondition(get(values, condition.when), condition);
  }

  if (Array.isArray(condition.when)) {
    return !!condition.when.map(fieldName => fieldCondition(get(values, fieldName), condition)).find(condition => !!condition);
  }

  return false;
};

const Condition = ({ condition, children }) => (
  <FormSpy>
    { ({ values }) => parseCondition(condition, values) ? children : null }
  </FormSpy>
);

const conditionProps = {
  when: PropTypes.string.isRequired,
  is: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  isNotEmpty: PropTypes.bool,
  isEmpty: PropTypes.bool,
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  pattern: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.instanceOf(RegExp),
  ]),
  notMatch: PropTypes.any,
};

Condition.propTypes = {
  condition: PropTypes.oneOfType([
    PropTypes.shape(conditionProps),
    PropTypes.arrayOf(PropTypes.shape(conditionProps)),
  ]),
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Condition;
