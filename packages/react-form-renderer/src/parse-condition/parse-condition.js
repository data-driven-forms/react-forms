import lodashIsEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const isEmptyValue = (value) => {
  if (value instanceof Date) {
    return isNaN(value.getTime());
  }

  return typeof value === 'number' || value === true ? false : lodashIsEmpty(value);
};

const fieldCondition = (value, config) => {
  if (config.isNotEmpty) {
    return !isEmptyValue(value);
  }

  if (config.isEmpty) {
    return isEmptyValue(value);
  }

  if (config.pattern) {
    const regExpPattern = RegExp(config.pattern, config.flags);

    return config.notMatch ? !regExpPattern.test(value) : regExpPattern.test(value);
  }

  if (typeof config.is === 'function') {
    return config.is(value, config);
  }

  if (Object.prototype.hasOwnProperty.call(config, 'greaterThan')) {
    return value > config.greaterThan;
  }

  if (Object.prototype.hasOwnProperty.call(config, 'greaterThanOrEqualTo')) {
    return value >= config.greaterThanOrEqualTo;
  }

  if (Object.prototype.hasOwnProperty.call(config, 'lessThan')) {
    return value < config.lessThan;
  }

  if (Object.prototype.hasOwnProperty.call(config, 'lessThanOrEqualTo')) {
    return value <= config.lessThanOrEqualTo;
  }

  const isMatched = Array.isArray(config.is) ? !!config.is.includes(value) : value === config.is;

  return config.notMatch ? !isMatched : isMatched;
};

const allowedMappedAttributes = ['when', 'is'];

export const unpackMappedCondition = (condition, conditionMapper) => {
  if (typeof condition.mappedAttributes !== 'object') {
    return condition;
  }

  const { mappedAttributes } = condition;

  const internalCondition = {
    ...condition,
    mappedAttributes: undefined,
  };

  Object.entries(mappedAttributes).forEach(([key, value]) => {
    if (!allowedMappedAttributes.includes(key)) {
      console.error(`Mapped condition attribute ${key} is not allowed! Allowed attributes are: ${allowedMappedAttributes.join(', ')}`);
      return;
    }

    if (conditionMapper[value?.[0]]) {
      const [fnName, ...args] = value;
      const fn = conditionMapper[fnName];
      internalCondition[key] = fn(...args);
    } else {
      console.error(`Missing conditionMapper entry for ${value}!`);
    }
  });

  return internalCondition;
};

export const parseCondition = (condition, values, field, conditionMapper = {}) => {
  let positiveResult = {
    visible: true,
    ...condition.then,
    result: true,
  };

  let negativeResult = {
    visible: false,
    ...condition.else,
    result: false,
  };

  if (Array.isArray(condition)) {
    return !condition.map((condition) => parseCondition(condition, values, field, conditionMapper)).some(({ result }) => result === false)
      ? positiveResult
      : negativeResult;
  }

  const conditionInternal = unpackMappedCondition(condition, conditionMapper);

  if (conditionInternal.and) {
    return !conditionInternal.and.map((condition) => parseCondition(condition, values, field, conditionMapper)).some(({ result }) => result === false)
      ? positiveResult
      : negativeResult;
  }

  if (conditionInternal.sequence) {
    return conditionInternal.sequence.reduce(
      (acc, curr) => {
        const result = parseCondition(curr, values, field, conditionMapper);

        return {
          sets: [...acc.sets, ...(result.set ? [result.set] : [])],
          visible: acc.visible || result.visible,
          result: acc.result || result.result,
        };
      },
      { ...negativeResult, sets: [] }
    );
  }

  if (conditionInternal.or) {
    return conditionInternal.or.map((condition) => parseCondition(condition, values, field, conditionMapper)).some(({ result }) => result === true)
      ? positiveResult
      : negativeResult;
  }

  if (conditionInternal.not) {
    return !parseCondition(conditionInternal.not, values, field, conditionMapper).result ? positiveResult : negativeResult;
  }

  const finalWhen = typeof conditionInternal.when === 'function' ? conditionInternal.when(field) : conditionInternal.when;

  if (typeof finalWhen === 'string') {
    return fieldCondition(get(values, finalWhen), conditionInternal) ? positiveResult : negativeResult;
  }

  if (Array.isArray(finalWhen)) {
    return finalWhen
      .map((fieldName) => fieldCondition(get(values, typeof fieldName === 'function' ? fieldName(field) : fieldName), conditionInternal))
      .find((condition) => !!condition)
      ? positiveResult
      : negativeResult;
  }

  return negativeResult;
};

export default parseCondition;
