import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty as lodashIsEmpty } from 'lodash';
import { FormSpy } from 'react-final-form';

const isEmptyValue = (value) => typeof value === 'number' || value === true ? false : lodashIsEmpty(value);

const Condition = ({ condition, children }) => {
  const fieldCondition = (value, { is, isNotEmpty, isEmpty, pattern, notMatch }) => {
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

  const shouldRender = (values, conditionItem) => {
    if (typeof conditionItem.when === 'string') {
      return fieldCondition(values[conditionItem.when], conditionItem);
    }

    if (Array.isArray(conditionItem.when)) {
      return conditionItem.when.map(fieldName => fieldCondition(values[fieldName], conditionItem)).find(condition => !!condition);
    }

    return false;
  };

  return (
    <FormSpy>
      { ({ values }) => {
        const visible = Array.isArray(condition)
          ? !condition.map(conditionItem => !!shouldRender(values, conditionItem)).some(result => result === false)
          : shouldRender(values, condition);

        return visible ? children : null;
      } }
    </FormSpy>
  );

};

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
