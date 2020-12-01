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

export const parseCondition = (condition, values, field) => {
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
    return !condition.map((condition) => parseCondition(condition, values, field)).some(({ result }) => result === false)
      ? positiveResult
      : negativeResult;
  }

  if (condition.and) {
    return !condition.and.map((condition) => parseCondition(condition, values, field)).some(({ result }) => result === false)
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
    return condition.or.map((condition) => parseCondition(condition, values, field)).some(({ result }) => result === true)
      ? positiveResult
      : negativeResult;
  }

  if (condition.not) {
    return !parseCondition(condition.not, values).result ? positiveResult : negativeResult;
  }

  const finalWhen = typeof condition.when === 'function' ? condition.when(field) : condition.when;

  if (typeof finalWhen === 'string') {
    return fieldCondition(get(values, finalWhen), condition) ? positiveResult : negativeResult;
  }

  if (Array.isArray(finalWhen)) {
    return finalWhen
      .map((fieldName) => fieldCondition(get(values, typeof fieldName === 'function' ? fieldName(field) : fieldName), condition))
      .find((condition) => !!condition)
      ? positiveResult
      : negativeResult;
  }

  return negativeResult;
};

export default parseCondition;
