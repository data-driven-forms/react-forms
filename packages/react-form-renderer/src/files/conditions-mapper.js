/*
  conditionsMapper will remap a conditions object and create an object with each depending fieldName as a key.

  Since one field can be involed in more than one condition, an array of condition references will be created under each fieldName key

  Since more than one field can be involved in the same condition, the same condition might be referenced from
  several condition arrays.
*/

function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function isArray(obj) {
  return Array.isArray(obj);
}

export const conditionsMapper = ({conditions}) => {
  if (!conditions) return {};

  function traverse({obj, fnc, key}) {
    fnc && fnc({obj, key});

    if (isArray(obj)) {
      traverseArray({
        obj,
        fnc,
        key,
      });
    } else if (isObject(obj)) {
      traverseObject({
        obj,
        fnc,
        key,
      });
    }
  }

  function traverseArray({obj, fnc, key}) {
    obj.forEach(([key, item]) => {
      traverse({
        obj: item,
        fnc,
        key,
      });
    });
  }

  function traverseObject({obj, fnc, key}) {
    Object.entries(obj).forEach(([key, item]) => {
      traverse({
        obj: item,
        fnc,
        key,
      });
    });
  }

  const indexedConditions = {};
  const conditionArray = Object.entries(conditions);

  conditionArray
    .map(([key, condition]) => {
      return {
        key: key,
        ...condition,
      };
    })
    .forEach(condition => {
      traverse({
        obj: condition,
        fnc: ({obj, key}) => {
          if (key === 'when') {
            const fieldNames = isArray(obj) ? obj : [obj];
            fieldNames.map(fieldName => {
              indexedConditions[fieldName] = indexedConditions[fieldName] || [];
              indexedConditions[fieldName].push(condition);
            });
          }
        },
      });
    });

  return indexedConditions;
};
