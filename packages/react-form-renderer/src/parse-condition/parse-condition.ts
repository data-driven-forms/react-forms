import lodashIsEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { AnyObject } from "../common-types/any-object";
import { ConditionDefinition, ConditionProp } from "../condition";
import Field from "../common-types/field";
import { ConditionMapper } from "../form-renderer/condition-mapper";

interface ParsedConditionResult {
  visible: boolean;
  result: boolean;
  sets?: object[];
  set?: object;
  [key: string]: any;
}

const isEmptyValue = (value: any): boolean => {
  if (value instanceof Date) {
    return isNaN(value.getTime());
  }

  return typeof value === 'number' || value === true ? false : lodashIsEmpty(value);
};

interface FieldConditionConfig {
  isNotEmpty?: boolean;
  isEmpty?: boolean;
  pattern?: string | RegExp;
  flags?: string;
  notMatch?: boolean;
  is?: any;
  greaterThan?: number;
  greaterThanOrEqualTo?: number;
  lessThan?: number;
  lessThanOrEqualTo?: number;
}

const fieldCondition = (value: any, config: FieldConditionConfig): boolean => {
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
    return value > config.greaterThan!;
  }

  if (Object.prototype.hasOwnProperty.call(config, 'greaterThanOrEqualTo')) {
    return value >= config.greaterThanOrEqualTo!;
  }

  if (Object.prototype.hasOwnProperty.call(config, 'lessThan')) {
    return value < config.lessThan!;
  }

  if (Object.prototype.hasOwnProperty.call(config, 'lessThanOrEqualTo')) {
    return value <= config.lessThanOrEqualTo!;
  }

  const isMatched = Array.isArray(config.is) ? !!config.is.includes(value) : value === config.is;

  return config.notMatch ? !isMatched : isMatched;
};

const allowedMappedAttributes = ['when', 'is'];

export const unpackMappedCondition = (condition: ConditionDefinition, conditionMapper: ConditionMapper = {}): ConditionDefinition => {
  if (typeof condition.mappedAttributes !== 'object' || !condition.mappedAttributes) {
    return condition;
  }

  const { mappedAttributes } = condition;

  const internalCondition: ConditionDefinition = {
    ...condition,
    mappedAttributes: undefined,
  };

  Object.entries(mappedAttributes).forEach(([key, value]) => {
    if (!allowedMappedAttributes.includes(key)) {
      console.error(`Mapped condition attribute ${key} is not allowed! Allowed attributes are: ${allowedMappedAttributes.join(', ')}`);
      return;
    }

    if (Array.isArray(value) && conditionMapper[value?.[0]]) {
      const [fnName, ...args] = value;
      const fn = conditionMapper[fnName];
      (internalCondition as any)[key] = fn(...args);
    } else {
      console.error(`Missing conditionMapper entry for ${value}!`);
    }
  });

  return internalCondition;
};

export const parseCondition = (
  condition: ConditionDefinition | ConditionDefinition[],
  values: AnyObject,
  field: Field,
  conditionMapper: ConditionMapper = {}
): ParsedConditionResult => {
  let positiveResult: ParsedConditionResult = {
    visible: true,
    result: true,
  };

  let negativeResult: ParsedConditionResult = {
    visible: false,
    result: false,
  };

  if (Array.isArray(condition)) {
    if (typeof condition[0].then === 'object') {
      positiveResult = { ...positiveResult, ...condition[0].then };
    }
    if (typeof condition[0].else === 'object') {
      negativeResult = { ...negativeResult, ...condition[0].else };
    }

    return !condition.map((cond) => parseCondition(cond, values, field, conditionMapper)).some(({ result }) => result === false)
      ? positiveResult
      : negativeResult;
  }

  const conditionInternal = unpackMappedCondition(condition, conditionMapper);

  if (conditionInternal.then) {
    positiveResult = { ...positiveResult, ...conditionInternal.then };
  }

  if (conditionInternal.else) {
    negativeResult = { ...negativeResult, ...conditionInternal.else };
  }

  if (conditionInternal.and) {
    return !(Array.isArray(conditionInternal.and) ? conditionInternal.and : [conditionInternal.and]).map((cond) => parseCondition(cond, values, field, conditionMapper)).some(({ result }) => result === false)
      ? positiveResult
      : negativeResult;
  }

  if (conditionInternal.sequence) {
    return conditionInternal.sequence.reduce(
      (acc, curr) => {
        const result = parseCondition(curr, values, field, conditionMapper);

        return {
          sets: [...(acc.sets || []), ...(result.set ? [result.set] : [])],
          visible: acc.visible || result.visible,
          result: acc.result || result.result,
        };
      },
      { ...negativeResult, sets: [] as object[] }
    );
  }

  if (conditionInternal.or) {
    return (Array.isArray(conditionInternal.or) ? conditionInternal.or : [conditionInternal.or]).map((cond) => parseCondition(cond, values, field, conditionMapper)).some(({ result }) => result === true)
      ? positiveResult
      : negativeResult;
  }

  if (conditionInternal.not) {
    return !parseCondition(conditionInternal.not, values, field, conditionMapper).result ? positiveResult : negativeResult;
  }

  const finalWhen = typeof conditionInternal.when === 'function' ? conditionInternal.when(field.name) : conditionInternal.when;

  if (typeof finalWhen === 'string') {
    return fieldCondition(get(values, finalWhen), conditionInternal) ? positiveResult : negativeResult;
  }

  if (Array.isArray(finalWhen)) {
    return finalWhen
      .map((fieldName) => fieldCondition(get(values, typeof fieldName === 'function' ? fieldName(field.name) : fieldName), conditionInternal))
      .find((cond) => !!cond)
      ? positiveResult
      : negativeResult;
  }

  return negativeResult;
};

export default parseCondition;