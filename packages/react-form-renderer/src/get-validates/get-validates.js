import get from 'lodash/get';

import prepareComponentProps from '../prepare-component-props';
import { dataTypeValidator } from '../validators/validator-functions';

const getValidates = (schema, { componentMapper, actionMapper, values }, validations = {}) => {
  if (Array.isArray(schema)) {
    schema.map((field) => getValidates(field, { componentMapper, actionMapper, values }, validations));
  } else {
    if (schema.component) {
      let validate;

      const { componentProps, overrideProps, mergedResolveProps } = prepareComponentProps({
        component: schema.component,
        rest: schema,
        componentMapper,
        actionMapper,
      });

      let resolveProps = mergedResolveProps || overrideProps.resolveProps || componentProps.resolveProps;

      // fake form state with only values
      if (resolveProps) {
        const { validate: resolvePropsValidate } = resolveProps(
          schema,
          { input: { value: get(values, schema.name) }, meta: {} },
          { getState: () => ({ values }) }
        );

        validate = resolvePropsValidate;
      }

      validate = validate || overrideProps.validate || componentProps.validate;

      if (schema.dataType) {
        validate = [...(validate || []), dataTypeValidator(schema.dataType)()];
      }

      if (validate) {
        if (validations[schema.name]) {
          validations[schema.name].push(validate);
        } else {
          validations[schema.name] = [validate];
        }
      }
    }

    if (schema.fields) {
      getValidates(schema.fields, { componentMapper, actionMapper, values }, validations);
    }
  }

  return validations;
};

export default getValidates;
