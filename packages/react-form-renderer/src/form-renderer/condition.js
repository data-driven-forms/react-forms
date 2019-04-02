import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as lodashIsEmpty } from 'lodash';
import { Field } from 'react-final-form';

const isEmptyValue = (value) => typeof value === 'number' || value === true ? false : lodashIsEmpty(value);

const Condition = ({ when, is, isNotEmpty, isEmpty, children, pattern, notMatch }) => {
  const shouldRender = value => {
    if (isNotEmpty){
      return !isEmptyValue(value);
    }

    if (isEmpty){
      return isEmptyValue(value);
    }

    if (pattern) {
      return notMatch ? !pattern.test(value) : pattern.test(value);
    }

    const isMatched = Array.isArray(is) ? !!is.includes(value) : value === is;

    return notMatch ? !isMatched : isMatched;
  };

  return (
    <Field name={ when } subscription={{ value: true }}>
      { ({ input: { value }}) => (shouldRender(value) ? children : null) }
    </Field>
  );
};

Condition.propTypes = {
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

export default Condition;
