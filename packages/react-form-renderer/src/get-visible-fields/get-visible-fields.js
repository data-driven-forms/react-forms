import parseCondition from '../parse-condition';

const getVisibleFields = (schema, values) => {
  if (Array.isArray(schema)) {
    return schema.map((field) => getVisibleFields(field, values)).filter(Boolean);
  }

  if (schema.condition) {
    const result = parseCondition(schema.condition, values, schema);

    if (result.visible) {
      return {
        ...schema,
        ...(schema.fields && { fields: getVisibleFields(schema.fields, values).filter(Boolean) })
      };
    } else {
      return null;
    }
  }

  return {
    ...schema,
    ...(schema.fields && { fields: getVisibleFields(schema.fields, values).filter(Boolean) })
  };
};

export default getVisibleFields;
