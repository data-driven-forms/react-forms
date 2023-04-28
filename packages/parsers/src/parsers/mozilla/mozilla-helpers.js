import { validatorTypes, componentTypes } from '@data-driven-forms/react-form-renderer';

/**
 * Function that creates field level validation
 * @param {Object} param0
 * @param {Object} param0.schema - Form schema definition
 * @param {Object} param0.fields - Form fields definition
 * @param {Object} param0.key - current field identifier
 * @returns {Array<Object>} list of fields validators definitions
 */
export const validatorBuilder = ({ schema, fields = {}, key }) => {
  const result = [];
  if (schema.required && schema.required.includes(key)) {
    result.push({ type: validatorTypes.REQUIRED });
    fields[key].isRequired = true;
  }

  if (fields[key] && fields[key].minLength) {
    result.push({ type: validatorTypes.MIN_LENGTH, threshold: fields[key].minLength });
    delete fields[key].minLength;
  }

  if (fields[key] && fields[key].pattern) {
    result.push({ type: validatorTypes.PATTERN, pattern: fields[key].pattern });
  }

  if (schema.minItems) {
    result.push({ type: validatorTypes.MIN_ITEMS, threshold: schema.minItems });
  }

  return result;
};

/**
 * @typedef {Object} ComponentDefinition
 * @property {string} component string key of component type
 * @property {string} type type of input-like component
 * @property {string} dataType allowed data type of input values
 */

/**
 * Maps schema field types to react field types
 * @param {string} type mozilla field tpe
 * @param {string} dataType mozilla data type
 * @returns {ComponentDefinition}
 */
export const componentMapper = (type, dataType) =>
  ({
    string: { component: componentTypes.TEXT_FIELD, type: 'text', dataType },
    uri: { component: componentTypes.TEXT_FIELD, type: 'uri', dataType },
    date: { component: componentTypes.TEXT_FIELD, type: 'date', dataType },
    'date-time': { component: componentTypes.TEXT_FIELD, type: 'datetime-local', dataType },
    color: { component: componentTypes.TEXT_FIELD, type: 'color', dataType },
    hidden: { component: componentTypes.TEXT_FIELD, type: 'hidden', dataType },
    tel: { component: componentTypes.TEXT_FIELD, type: 'tel', dataType },
    email: { component: componentTypes.TEXT_FIELD, type: 'email', dataType },
    password: { component: componentTypes.TEXT_FIELD, type: 'password', dataType },
    integer: { component: componentTypes.TEXT_FIELD, type: 'number', step: 1, dataType },
    updown: { component: componentTypes.TEXT_FIELD, type: 'number', dataType },
    number: { component: componentTypes.TEXT_FIELD, type: 'number', dataType },
    range: { component: componentTypes.TEXT_FIELD, type: 'range', dataType },
    textarea: { component: componentTypes.TEXTAREA, dataType },
    select: { component: componentTypes.SELECT, dataType },
    boolean: { component: componentTypes.CHECKBOX, type: 'checkbox', dataType },
    checkbox: { component: componentTypes.CHECKBOX, type: 'checkbox', dataType },
    checkboxes: { component: componentTypes.CHECKBOX, type: 'checkbox', dataType },
    radio: { component: componentTypes.RADIO, type: 'radio', dataType },
  }[type]);

/**
 * Maps mozilla input options to PF4 interface
 * @param {Object} options mozilla ui:options definitions
 * @returns {Object} PF4 input props
 */
export const createFieldOptions = (options = {}) => {
  const result = {};
  const uiOption = options['ui:options'] || {};
  result.isDisabled = options['ui:disabled'];
  result.isReadOnly = options['ui:readonly'];
  result.inline = uiOption.inline;
  result.rows = uiOption.rows;
  return result;
};

export const isNestedReference = (fields, key) => fields[key] && fields[key].items && fields[key].items.$ref;
export const isDefinedByReference = (fields, key) => fields[key] && fields[key].$ref;
export const isAddableSubForm = (fields, key) =>
  fields[key] && fields[key].type === 'array' && fields[key].items && fields[key].items.type === 'object';
export const isAddableWithFixedFields = (fields, key) =>
  fields[key] && fields[key].type === 'array' && Array.isArray(fields[key].items) && fields[key].additionalItems;
export const isAddableWithOneField = (fields, key) =>
  fields[key] && fields[key].type === 'array' && fields[key].items && typeof fields[key].items === 'object';
export const ifFullSubForm = (fields, key) => fields[key] && fields[key].properties && typeof fields[key].properties === 'object';

/**
 * Replace object keys with mapped values
 * @param {Object} initialObject object with keys that should be replaced
 * @param {Object} replacements maps input object properties with new ones
 * @returns {Object} with replaced keys
 */
export const replaceKeys = (initialObject, replacements) =>
  Object.keys(initialObject)
    .map((key) => ({ [replacements[key] || key]: initialObject[key] }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

/**
 * Function that will re order the schema fields based on explicit definition
 * @param {Object} schema fields schema
 * @param {Array} order Array with form fields in their rendering order
 * @returns {Object} ordered form fields schema
 */
export const orderSchema = (schema, order) => {
  let orderedSchema = schema;
  let orderedProperties = {};
  const initialOrder = Object.keys(schema.properties);
  /**
   * find index of splitter in order
   */
  const endingIndex = order.indexOf('*');

  const startingFields = [...order.slice(0, endingIndex)];
  const endingFields = [...order.slice(endingIndex + 1)];
  const unOrdered = initialOrder.filter((item) => !order.find((orderedItem) => item === orderedItem));
  /**
   * Order starting fields
   */
  startingFields.forEach((fieldKey) => {
    orderedProperties[fieldKey] = schema.properties[fieldKey];
  });
  /**
   * Insert unordered fields into middle
   */
  unOrdered.forEach((fieldKey) => {
    orderedProperties[fieldKey] = schema.properties[fieldKey];
  });
  /**
   * append ending fields to the end
   */
  endingFields.forEach((fieldKey) => {
    orderedProperties[fieldKey] = schema.properties[fieldKey];
  });

  return { ...orderedSchema, properties: { ...orderedProperties } };
};

export const createDynamicListWithFixed = (schema, uiSchema, key) => [
  ...schema.items.map(({ type, title, ...rest }, index) => {
    let options;
    if (type === 'boolean') {
      if (!((!rest.enum && uiSchema.items && !uiSchema.items[index]) || (!rest.enum && !uiSchema.items))) {
        options =
          rest.enum || (uiSchema.items && uiSchema.items[index]['ui:widget'] === 'select')
            ? [
                {
                  label: 'Please Choose',
                  value: undefined,
                  disabled: true,
                },
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]
            : ['Yes', 'No'];
      }
    }

    return {
      validate: validatorBuilder({ schema, key: `${key}` }),
      label: title,
      name: `${key}.items.${index}`,
      ...componentMapper((uiSchema.items && uiSchema.items[index]['ui:widget']) || type, type),
      options,
      ...rest,
    };
  }),
];

export const buildConditionalFields = (properties, dependencies, key) => ({
  [key]: { ...properties[key] },
  ...dependencies[key].oneOf.reduce((acc, curr) => {
    const conditionValues = [...curr.properties[key].enum];
    const newProperty = { ...curr.properties };
    delete newProperty[key];
    const enhancedProperties = Object.keys(newProperty).reduce(
      (accumulator, propertyKey) => ({
        ...accumulator,
        [propertyKey]: {
          ...newProperty[propertyKey],
          condition: {
            when: key,
            is: conditionValues,
          },
        },
      }),
      {}
    );
    return { ...acc, ...enhancedProperties };
  }, {}),
});
