/* eslint-disable no-prototype-builtins */
import DefaultSchemaError from '../schema-errors';
//import isValidComponent from './isValidComponent';
import componentTypes from '../component-types';
import dataTypes from '../data-types';
import Schema from '../common-types/schema';
import ComponentMapper from '../common-types/component-mapper';
import SchemaValidatorMapper from '../common-types/schema-validator-mapper';
import Field from '../common-types/field';

const componentBlackList = [componentTypes.FIELD_ARRAY, 'tab-item'];

interface ObjectWithFields {
  fields?: any;
}

interface ConditionalAction {
  visible?: any;
  set?: any;
}

// Using ConditionDefinition from the condition module

interface ValidatorDefinition {
  type?: string;
  [key: string]: any;
}

const checkFieldsArray = (obj: ObjectWithFields, objectKey: string): void => {
  if (!obj.hasOwnProperty('fields')) {
    throw new DefaultSchemaError(`Component of type ${objectKey} must contain "fields" property of type array, received undefined!`);
  }

  if (!Array.isArray(obj.fields)) {
    throw new DefaultSchemaError(`Component of type ${objectKey} must contain "fields" property of type array, received type: ${typeof obj.fields}!`);
  }
};

const checkConditionalAction = (type: string, action: ConditionalAction, fieldName: string): void => {
  if (action.hasOwnProperty('visible') && typeof action.visible !== 'boolean') {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      'visible' property in action "${type}" has to be a boolean value! Received: ${typeof action.visible}.
    `);
  }

  if (action.hasOwnProperty('set') && ((typeof action.set !== 'object' && typeof action.set !== 'function') || Array.isArray(action.set))) {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      'set' property in action "${type}" has to be a object! Received: ${typeof action.visible}, isArray: ${Array.isArray(action.set)}.
    `);
  }
};

const requiredOneOf = ['is', 'isEmpty', 'isNotEmpty', 'pattern', 'greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'lessThanOrEqualTo'];

const checkMappedAttributes = (condition: any): boolean => {
  const hasStaticAttribute = requiredOneOf.some((key) => condition.hasOwnProperty(key));
  if (hasStaticAttribute) {
    return true;
  }

  if (
    condition.hasOwnProperty('mappedAttributes') &&
    typeof condition.mappedAttributes === 'object' &&
    !Array.isArray(condition.mappedAttributes) &&
    condition.mappedAttributes !== null
  ) {
    return requiredOneOf.some((key) => condition.mappedAttributes!.hasOwnProperty(key));
  }

  return false;
};

const checkCondition = (condition: any, fieldName: string, isRoot?: boolean | string): void => {
  /**
   * validate array condition
   */
  if (Array.isArray(condition)) {
    return condition.forEach((item) => checkCondition(item, fieldName));
  }

  if (condition.hasOwnProperty('and') && !Array.isArray(condition.and)) {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      'and' property in a field condition must be an array! Received: ${typeof condition.and}.
    `);
  }

  if (condition.hasOwnProperty('or') && !Array.isArray(condition.or)) {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      'or' property in a field condition must be an array! Received: ${typeof condition.or}.
    `);
  }

  if (condition.hasOwnProperty('sequence') && !Array.isArray(condition.sequence)) {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      'sequence' property in a field condition must be an array! Received: ${typeof condition.sequence}.
    `);
  }

  if (condition.hasOwnProperty('sequence') && !isRoot) {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      'sequence' condition has to be the root condition: " condition: { sequence: [ ... ]} "
    `);
  }

  if ((condition.hasOwnProperty('then') || condition.hasOwnProperty('else')) && !isRoot) {
    throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      'then', 'else' condition keys can be included only in root conditions or in a 'sequence'.
    `);
  }

  if (condition.hasOwnProperty('then')) {
    checkConditionalAction('then', condition.then!, fieldName);
  }

  if (condition.hasOwnProperty('else')) {
    checkConditionalAction('else', condition.else!, fieldName);
  }

  if (typeof condition !== 'object') {
    throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must be an object, received ${Array.isArray(condition) ? 'array' : typeof condition}!
    `);
  }

  if (
    !condition.hasOwnProperty('and') &&
    !condition.hasOwnProperty('or') &&
    !condition.hasOwnProperty('not') &&
    !condition.hasOwnProperty('sequence')
  ) {
    const isWhenMapped = condition.hasOwnProperty('mappedAttributes') && condition.mappedAttributes?.hasOwnProperty('when');
    if (!condition.hasOwnProperty('when') && !isWhenMapped) {
      throw new DefaultSchemaError(`
      Error occured in field definition with "name" property: "${fieldName}".
      Field condition must have "when" property! Properties received: [${Object.keys(condition)}].
    `);
    }

    if (!isWhenMapped && !(typeof condition.when === 'string' || typeof condition.when === 'function' || Array.isArray(condition.when))) {
      throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition property "when" must be of type "string", "function" or "array", ${typeof condition.when} received!].
    `);
    }

    if (!checkMappedAttributes(condition)) {
      throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must have one of "is", "isEmpty", "isNotEmpty", "pattern", "greaterThan", "greaterThanOrEqualTo", "lessThan", "lessThanOrEqualTo" property! Properties received: [${Object.keys(
        condition
      )}].
    `);
    }

    if (condition.hasOwnProperty('notMatch') && !condition.hasOwnProperty('pattern') && !condition.hasOwnProperty('is')) {
      throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must have "pattern" or "is" property when "notMatch" is set! Properties received: [${Object.keys(condition)}].
    `);
    }

    if (condition.hasOwnProperty('pattern') && !(condition.pattern instanceof RegExp) && typeof condition.pattern !== 'string') {
      throw new DefaultSchemaError(`
      Error occured in field definition with name: "${fieldName}".
      Field condition must have "pattern" of instance "RegExp" or "string"! Instance received: [${(condition.pattern as any).constructor.name}].
    `);
    }
  } else {
    ['and', 'or', 'not'].forEach((key) => {
      if (condition.hasOwnProperty(key)) {
        checkCondition((condition as any)[key], fieldName);
      }
    });

    if (condition.hasOwnProperty('sequence')) {
      condition.sequence!.forEach((item: any) => checkCondition(item, fieldName, 'root'));
    }
  }
};

const checkValidators = (validate: ValidatorDefinition[] | Function[], fieldName: string, validatorTypes: string[], validatorMapper: Record<string, Function> = {}): void => {
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

    if (typeof validator !== 'function') {
      const validatorObj = validator as ValidatorDefinition;
      if (!validatorObj.hasOwnProperty('type')) {
        throw new DefaultSchemaError(`
        Error occured in field definition with name: "${fieldName}".
        Field validator at index: ${index} does not have "type" property! Properties received: [${Object.keys(validatorObj)}].
      `);
      }

      if (!validatorTypes.includes(validatorObj.type!)) {
        throw new DefaultSchemaError(`
        Error occured in field definition with name: "${fieldName}".
        Field validator at index: ${index} does not have correct "type" property!
        Received "${validatorObj.type}", expected one of: [${validatorTypes}].
      `);
      }

      if (validatorMapper.hasOwnProperty(validatorObj.type!)) {
        validatorMapper[validatorObj.type!](validatorObj, fieldName);
      }
    }
  });
};

const checkDataType = (type: string, fieldName: string): void => {
  if (typeof type !== 'string') {
    throw new DefaultSchemaError(`
    Error occured in field definition with name: "${fieldName}".
    Unknow dataType. Data type must be string
    `);
  }

  if (!Object.values(dataTypes).includes(type as any)) {
    throw new DefaultSchemaError(`
    Error occured in field definition with name: "${fieldName}".
    Unknow dataType ${type}. Must be one these values: ${Object.values(dataTypes)}
    `);
  }
};

const checkActions = (actions: Record<string, any[]>, name: string, actionTypes: string[], actionsValidator: Record<string, Function> = {}): void => {
  Object.keys(actions).forEach((prop) => {
    if (!Array.isArray(actions[prop])) {
      throw new DefaultSchemaError(`
      Action on prop "${prop}" in component "${name}" is not an array.
      Please, make sure you defined your action in the schema.
      ActionMapper has these values: [${actionTypes}]
    `);
    }

    if (!actions[prop][0]) {
      throw new DefaultSchemaError(`
      Action on prop "${prop}" in component "${name}" has not defined action type as the first element.
      Please, make sure you defined your action in the schema.
      ActionMapper has these values: [${actionTypes}]
    `);
    }

    if (!actionTypes.includes(actions[prop][0])) {
      throw new DefaultSchemaError(`
      Action on prop "${prop}" in component "${name}" does not exist in ActionMapper.
      ActionMapper has these values: [${actionTypes}].
      Use one of them or define new action in the mapper.
    `);
    }

    if (actionsValidator.hasOwnProperty(actions[prop][0])) {
      actionsValidator[actions[prop][0]](actions[prop], name);
    }
  });
};

const iterateOverFields = (fields: (Field | Field[])[], componentMapper: ComponentMapper, validatorTypes: string[], actionTypes: string[], schemaValidatorMapper: SchemaValidatorMapper, parent: Partial<Field> = {}): void => {
  fields.forEach((field) => {
    if (Array.isArray(field)) {
      return iterateOverFields(field, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
    }

    if (![componentTypes.WIZARD, componentTypes.TABS].includes(parent.component as any)) {
      if (parent.component !== componentTypes.WIZARD && !field.hasOwnProperty('component')) {
        throw new DefaultSchemaError(`Each fields item must have "component" property!`);
      }

      if (!componentBlackList.includes(field.component) && !componentMapper.hasOwnProperty(field.component)) {
        throw new DefaultSchemaError(`
          Component of type "${field.component}" is not present in componentMapper.
          Please make sure "${field.component} is included in your componentMapper."
          componentMapper has these values: [${Object.keys(componentMapper)}]
        `);
      }

      /**
       * Investiage
       */
      //if (!componentBlackList.includes(field.component) && !isValidComponent(componentMapper[field.component])) {
      //  throw new DefaultSchemaError(`FormComponent "${field.component}" from componentMapper is not a valid React component!`);
      //}
    }

    if (!field.hasOwnProperty('name') && parent.component !== 'field-array') {
      throw new DefaultSchemaError(`Each fields item must have "name" property! Name is used as a unique identifier of form fields.`);
    }

    if (field.hasOwnProperty('condition')) {
      checkCondition(field.condition!, field.name, 'root');
    }

    if (field.hasOwnProperty('validate')) {
      checkValidators(field.validate!, field.name, validatorTypes, schemaValidatorMapper.validators);
    }

    if (field.hasOwnProperty('dataType')) {
      checkDataType(field.dataType!, field.name);
    }

    if (field.hasOwnProperty('fields')) {
      iterateOverFields((field as any).fields, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper, field);
    }

    if (field.hasOwnProperty('actions')) {
      checkActions((field as any).actions, field.name, actionTypes, schemaValidatorMapper.actions);
    }

    if (schemaValidatorMapper.components && schemaValidatorMapper.components.hasOwnProperty(field.component)) {
      schemaValidatorMapper.components[field.component](field);
    }
  });
};

const defaultSchemaValidator = (schema: Schema, componentMapper: ComponentMapper, validatorTypes: string[] = [], actionTypes: string[] = [], schemaValidatorMapper: SchemaValidatorMapper = {}): void => {
  if (Array.isArray(schema) || typeof schema !== 'object') {
    throw new DefaultSchemaError(`Form Schema must be an object, received ${Array.isArray(schema) ? 'array' : typeof schema}!`);
  }

  checkFieldsArray(schema, 'schema');
  iterateOverFields(schema.fields, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
};

export default defaultSchemaValidator;