import get from 'lodash/get';

import composeValidators from '../compose-validators';
import defaultSchemaValidator from '../default-schema-validator';
import getValidates from '../get-validates';
import getVisibleFields from '../get-visible-fields';
import defaultValidatorMapper from '../validator-mapper';
import { getValidate } from '../use-field-api/validator-helpers';

const DEFAULT_COMPONENT = 'default-component';

const noop = () => {};

const changeToDefaultComponent = (schema) => {
  if (Array.isArray(schema)) {
    return schema.map(changeToDefaultComponent);
  }

  return {
    ...schema,
    ...(schema.component && { component: DEFAULT_COMPONENT }),
    ...(schema.fields && { fields: changeToDefaultComponent(schema.fields) }),
  };
};

const validation = async (schema, options) => {
  if (!schema) {
    throw new Error('validation requires a schema as the first argument.');
  }

  if (typeof options !== 'object') {
    throw new Error(`options argument has to be type of object, provided: ${typeof options}`);
  }

  const { values, componentMapper, validatorMapper, actionMapper, schemaValidatorMapper, omitWarnings } = options;

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

  finalSchema = getVisibleFields(finalSchema, values);

  const validates = getValidates(finalSchema, { componentMapper: finalComponentMapper, actionMapper, values });

  return await Object.keys(validates).reduce(async (accP, name) => {
    const acc = await accP;
    let error;
    let index = 0;

    while (!error && index + 1 <= validates[name].length) {
      const validateFn = composeValidators(getValidate(validates[name][index], undefined, validatorMapperMerged));

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
  }, {});
};

export default validation;
