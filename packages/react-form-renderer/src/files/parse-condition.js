import lodashIsEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

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

export default parseCondition;
