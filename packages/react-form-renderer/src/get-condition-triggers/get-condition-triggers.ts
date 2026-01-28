import { ConditionDefinition, WhenFunction, InnerWhenFunction } from '../condition';
import Field from '../common-types/field';
import { ConditionMapper } from '../form-renderer/condition-mapper';


const mergeFunctionTrigger = (fn: any, field: Field | undefined): string[] => {
  let internalTriggers: string[] = [];
  const internalWhen = fn(field);
  if (Array.isArray(internalWhen)) {
    internalTriggers = [...internalWhen];
  } else {
    internalTriggers.push(internalWhen);
  }

  return internalTriggers;
};

const getConditionTriggers = (
  condition: ConditionDefinition | ConditionDefinition[],
  field?: Field,
  conditionMapper: ConditionMapper = {}
): string[] => {
  let triggers: string[] = [];

  if (Array.isArray(condition)) {
    return condition.reduce((acc: string[], item) => [...acc, ...getConditionTriggers(item, field, conditionMapper)], []);
  }

  // extract mapped attributes to a new static condition object
  if (typeof condition.mappedAttributes === 'object') {
    try {
      const newCondition = { ...condition, mappedAttributes: undefined };
      Object.entries(condition.mappedAttributes).forEach(([attribute, mappedValue]) => {
        const [functionName, ...args] = mappedValue as any[];
        if (!conditionMapper[functionName]) {
          throw new Error(`Missing condition mapper function "${functionName}" for field ${field?.name || 'undefined'}!`);
        }

        (newCondition as any)[attribute] = conditionMapper[functionName](...args);
      });
      return getConditionTriggers(newCondition, field, conditionMapper);
    } catch (error: any) {
      console.error(error.toString());
    }
  }

  const { when, ...rest } = condition;
  const nestedKeys = ['and', 'or', 'sequence'] as const;

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
    if (Array.isArray(rest[key])) {
      (rest[key] as any[]).forEach((item: any) => {
        triggers = [...triggers, ...getConditionTriggers(item, field, conditionMapper)];
      });
    }
  });

  if (typeof condition.not === 'object') {
    triggers = [...triggers, ...getConditionTriggers(condition.not, field, conditionMapper)];
  }

  return Array.from(new Set(triggers));
};

export default getConditionTriggers;