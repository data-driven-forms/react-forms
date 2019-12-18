import DefaultSchemaError from './schema-errors';
import isValidComponent from './isValidComponent';
import { validators, components, dataTypes } from '../constants';

const componentBlackList = [ components.FIELD_ARRAY, 'tab-item' ];

const checkFieldsArray = (obj, objectKey) => {
  if (!obj.hasOwnProperty('fields')) {
    throw new DefaultSchemaError(`Component of type ${objectKey} must contain "fields" property of type array, received undefined!`);
  }

  if (!Array.isArray(obj.fields)) {
    throw new DefaultSchemaError(`Component of type ${objectKey} must contain "fields" property of type array, received type: ${typeof obj.fields}!`);
  }
};

const checkCondition = (condition, fieldName) => {
  /**
   * validate array condition
   */
  if (Array.isArray(condition)) {
    return condition.forEach(item => checkCondition(item, fieldName));
  }

  if (typeof condition !== 'object') {
    throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must be an object, received ${Array.isArray(condition) ? 'array' : typeof condition}!
    `);
  }

  if (!condition.hasOwnProperty('when')) {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      Field condition must have "when" property! Properties received: [${Object.keys(condition)}].
    `);
  }

  if (!(typeof condition.when === 'string' || Array.isArray(condition.when))) {
    throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition property "when" must be oof type "string", ${typeof condition.when} received!].
    `);
  }

  if (!condition.hasOwnProperty('is') && !condition.hasOwnProperty('isEmpty')
  && !condition.hasOwnProperty('isNotEmpty') && !condition.hasOwnProperty('pattern')) {
    throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must have one of "is", "isEmpty", "isNotEmpty", "pattern" property! Properties received: [${Object.keys(condition)}].
    `);
  }

  if (condition.hasOwnProperty('notMatch') && !condition.hasOwnProperty('pattern') && !condition.hasOwnProperty('is')) {
    throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must have "pattern" or "is" property when "notMatch" is set! Properties received: [${Object.keys(condition)}].
    `);
  }

  if (condition.hasOwnProperty('pattern') && !(condition.pattern instanceof RegExp)) {
    throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must have "pattern" of instance "RegExp"! Instance received: [${condition.pattern.constructor.name}].
    `);
  }
};

const checkValidators = (validate, fieldName) => {
  if (validate === undefined) {
    return;
  }

  if (!Array.isArray(validate)) {
    throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field validate property must be an Array, ${typeof validate} received!
    `);
  }

  validate.forEach((validator, index) => {
    if (Array.isArray(validator) || (typeof validator !== 'object' && typeof validator !== 'function')) {
      throw new DefaultSchemaError(`
        Error occured in field definition with name: "${fieldName}".
        Field validator at index: ${index} must be an object or a function, ${Array.isArray(validator) ? 'array' : typeof validator} received!
      `);
    }

    if (typeof validator !== 'function'){
      if (!validator.hasOwnProperty('type')) {
        throw new DefaultSchemaError(`
        Error occured in field definition with name: "${fieldName}".
        Field validator at index: ${index} does not have "type" property! Properties received: [${Object.keys(validator)}].
      `);
      }

      if (!Object.values(validators).includes(validator.type)) {
        throw new DefaultSchemaError(`
        Error occured in field definition with name: "${fieldName}".
        Field validator at index: ${index} does not have correct "type" property!
        Received "${validator.type}", expected one of: [${Object.values(validators)}].
      `);
      }
    }
  });
};

const checkDataType = (type, fieldName) => {
  if (typeof type !== 'string') {
    throw new DefaultSchemaError(`
    Error occured in field definition with name: "${fieldName}".
    Unknow dataType. Data type must be string
    `);
  }

  if (!Object.values(dataTypes).includes(type)) {
    throw new DefaultSchemaError(`
    Error occured in field definition with name: "${fieldName}".
    Unknow dataType ${type}. Must be one these values: ${Object.values(dataTypes)}
    `);
  }
};

const iterateOverFields = (fields, formFieldsMapper, layoutMapper, parent = {}) => {
  fields.forEach(field => {
    if (Array.isArray(field)) {
      return iterateOverFields(field, formFieldsMapper, layoutMapper);
    }

    if (parent.component !== components.WIZARD){
      if (parent.component !== components.WIZARD && !field.hasOwnProperty('component')) {
        throw new DefaultSchemaError(`Each fields item must have "component" property!`);
      }

      if (!componentBlackList.includes(field.component) && !formFieldsMapper.hasOwnProperty(field.component)) {
        throw new DefaultSchemaError(`
          Component of type "${field.component}" is not present in formFieldsMapper.
          Please make sure "${field.component} is included in your formFieldsMapper."
          FormFieldsMapper has these values: [${Object.keys(formFieldsMapper)}]
        `);
      }

      /**
       * Investiage
       */
      //if (!componentBlackList.includes(field.component) && !isValidComponent(formFieldsMapper[field.component])) {
      //  throw new DefaultSchemaError(`FormComponent "${field.component}" from formFieldsMapper is not a valid React component!`);
      //}

    }

    if (!field.hasOwnProperty('name') && !field.hasOwnProperty('title') && !field.hasOwnProperty('key') && parent.component !== 'field-array') {
      throw new DefaultSchemaError(`Each fields item must have "name" or "key" property! Name is used as a unique identifier of form fields.`);
    }

    if (field.hasOwnProperty('condition')) {
      checkCondition(field.condition, field.name);
    }

    if (field.hasOwnProperty('validate')) {
      checkValidators(field.validate, field.name);
    }

    if (field.hasOwnProperty('dataType')) {
      checkDataType(field.dataType, field.name);
    }

    if (field.hasOwnProperty('fields')) {
      iterateOverFields(field.fields, formFieldsMapper, layoutMapper, field);
    }
  });
};

const defaultSchemaValidator = (schema, formFieldsMapper, layoutMapper = {}) => {
  if (Array.isArray(schema) || typeof schema !== 'object') {
    throw new DefaultSchemaError(`Form Schema must be an object, received ${Array.isArray(schema) ? 'array' : typeof schema}!`);
  }

  checkFieldsArray(schema, 'schema');
  iterateOverFields(schema.fields, formFieldsMapper, layoutMapper);

};

export default defaultSchemaValidator;
