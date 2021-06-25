const updateFieldSchema = (schema, attributes) => ({
  fields: [{ ...schema.fields[0], ...attributes }]
});

export default updateFieldSchema;
