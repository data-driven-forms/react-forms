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

const getConditionTriggers = (condition, field, conditionMapper = {}) => {
  let triggers = [];
  if (Array.isArray(condition)) {
    return condition.reduce((acc, item) => [...acc, ...getConditionTriggers(item, field)], []);
  }

  // extract mapped attributes to a new static condition object
  if (typeof condition.mappedAttributes === 'object') {
    try {
      const newCondition = { ...condition, mappedAttributes: undefined };
      Object.entries(condition.mappedAttributes).forEach(([attribute, [functionName, ...args]]) => {
        if (!conditionMapper[functionName]) {
          throw new Error(`Missing condition mapper function "${functionName}" for field ${field.name}!`);
        }

        newCondition[attribute] = conditionMapper[functionName](...args);
      });
      return getConditionTriggers(newCondition, field, conditionMapper);
    } catch (error) {
      console.error(error.toString());
    }
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

  if (typeof condition.not === 'object') {
    triggers = [...triggers, ...getConditionTriggers(condition.not, field)];
  }

  return Array.from(new Set(triggers));
};

export default getConditionTriggers;
