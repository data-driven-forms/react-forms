import parseCondition from '../parse-condition';

const getVisibleFields = (schema, values, conditionMapper) => {
  if (Array.isArray(schema)) {
    return schema.map((field) => getVisibleFields(field, values, undefined, conditionMapper)).filter(Boolean);
  }

  if (schema.condition) {
    const result = parseCondition(schema.condition, values, schema, conditionMapper);

    if (result.visible) {
      return {
        ...schema,
        ...(schema.fields && { fields: getVisibleFields(schema.fields, values, undefined, conditionMapper).filter(Boolean) }),
      };
    } else {
      return null;
    }
  }

  return {
    ...schema,
    ...(schema.fields && { fields: getVisibleFields(schema.fields, values, undefined, conditionMapper).filter(Boolean) }),
  };
};

export default getVisibleFields;
