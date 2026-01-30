import get from 'lodash/get';
import composeValidators from '../compose-validators';
import defaultSchemaValidator from '../default-schema-validator';
import getValidates from '../get-validates';
import getVisibleFields from '../get-visible-fields';
import defaultValidatorMapper from '../validator-mapper';
import { getValidate, ValidatorMapper as HelperValidatorMapper } from '../use-field-api/validator-helpers';
import { ValidatorFunction } from '../validators';
import Schema from '../common-types/schema';
import Field from '../common-types/field';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper } from '../validator-mapper';
import { ActionMapper } from '../form-renderer/action-mapper';
import SchemaValidatorMapper from '../common-types/schema-validator-mapper';
import { ConditionMapper } from '../form-renderer/condition-mapper';

const DEFAULT_COMPONENT = 'default-component';

const noop = () => null;

const isValidatorFactory = (fn: any): fn is (config: any) => ValidatorFunction => {
  if (typeof fn !== 'function') {
    return false;
  }

  try {
    const result = fn({});
    return typeof result === 'function';
  } catch {
    return false;
  }
};

const convertValidatorMapper = (validatorMapper: ValidatorMapper): HelperValidatorMapper => {
  const converted: HelperValidatorMapper = {};
  for (const [key, value] of Object.entries(validatorMapper)) {
    if (isValidatorFactory(value)) {
      converted[key] = value;
    } else if (typeof value === 'function') {
      // It's a ValidatorFunction, wrap it in a factory
      converted[key] = () => value as ValidatorFunction;
    }
  }

  return converted;
};

const changeToDefaultComponent = (schema: Schema): Schema => {
  return {
    ...schema,
    fields: schema.fields.map((field) => ({
      ...field,
      ...(field.component && { component: DEFAULT_COMPONENT }),
      ...(field.fields && {
        fields: field.fields.map((subField: Field) => ({
          ...subField,
          ...(subField.component && { component: DEFAULT_COMPONENT }),
        })),
      }),
    })),
  };
};

export interface ValidationOptions {
  values: Record<string, any>;
  componentMapper?: ComponentMapper;
  validatorMapper?: ValidatorMapper;
  actionMapper?: ActionMapper;
  schemaValidatorMapper?: SchemaValidatorMapper;
  omitWarnings?: boolean;
  conditionMapper?: ConditionMapper;
}

export interface ValidationErrors {
  [fieldName: string]: any;
}

const validation = async (schema: Schema, options: ValidationOptions): Promise<ValidationErrors> => {
  if (!schema) {
    throw new Error('validation requires a schema as the first argument.');
  }

  if (typeof options !== 'object') {
    throw new Error(`options argument has to be type of object, provided: ${typeof options}`);
  }

  const { values, componentMapper, validatorMapper, actionMapper, schemaValidatorMapper, omitWarnings, conditionMapper } = options;

  const validatorMapperMerged = { ...defaultValidatorMapper, ...validatorMapper };

  const validatorTypes = Object.keys(validatorMapperMerged);
  const actionTypes = Object.keys(actionMapper || {});

  let finalComponentMapper = componentMapper;
  let finalSchema = schema;

  if (!finalComponentMapper) {
    finalComponentMapper = { [DEFAULT_COMPONENT]: noop };
    finalSchema = changeToDefaultComponent(schema);
  }

  defaultSchemaValidator(finalSchema, finalComponentMapper, validatorTypes, actionTypes, schemaValidatorMapper);

  const visibleFieldsResult = getVisibleFields(finalSchema, values, undefined, conditionMapper);
  finalSchema = visibleFieldsResult as Schema;

  const validates = getValidates(finalSchema.fields, { componentMapper: finalComponentMapper, actionMapper, values });

  return await Object.keys(validates).reduce(async (accP: Promise<ValidationErrors>, name: string) => {
    const acc = await accP;
    let error: any;
    let index = 0;

    while (!error && index + 1 <= validates[name].length) {
      const validateFn = composeValidators(getValidate(validates[name][index], undefined, convertValidatorMapper(validatorMapperMerged)));

      const fieldError = await validateFn(get(values, name), values, {});

      if (fieldError?.type !== 'warning' || (fieldError?.type === 'warning' && !omitWarnings)) {
        error = fieldError;
      }

      index = index + 1;
    }

    if (error) {
      return { ...acc, [name]: error };
    }

    return acc;
  }, Promise.resolve({}));
};

export default validation;
