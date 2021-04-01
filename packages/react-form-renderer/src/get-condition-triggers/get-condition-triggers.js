import { memoize } from '../common';

const mergeFunctionTrigger = (fn, field) => {
  let internalTriggers = [];
  const internalWhen = fn(field);
  if (Array.isArray(internalWhen)) {
    internalTriggers = [...internalWhen];
  } else {
    internalTriggers.push(internalWhen);
  }

  return internalTriggers;
};

const getConditionTriggers = memoize((condition, field) => {
  let triggers = [];
  if (Array.isArray(condition)) {
    return condition.reduce((acc, item) => [...acc, ...getConditionTriggers(item, field)], []);
  }

  const { when, ...rest } = condition;
  const nestedKeys = ['and', 'or', 'sequence'];
  if (typeof when === 'string') {
    triggers = [...triggers, when];
  }

  if (typeof when === 'function') {
    triggers = [...triggers, ...mergeFunctionTrigger(when, field)];
  }

  if (Array.isArray(when)) {
    when.forEach((item) => {
      if (typeof item === 'string') {
        triggers = [...triggers, item];
      }

      if (typeof item === 'function') {
        triggers = [...triggers, ...mergeFunctionTrigger(item, field)];
      }
    });
  }

  nestedKeys.forEach((key) => {
    if (typeof rest[key] !== 'undefined') {
      rest[key].forEach((item) => {
        triggers = [...triggers, ...getConditionTriggers(item, field)];
      });
    }
  });

  return Array.from(new Set(triggers));
});

export default getConditionTriggers;
