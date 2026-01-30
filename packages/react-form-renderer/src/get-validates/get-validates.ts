import get from 'lodash/get';
import prepareComponentProps from '../prepare-component-props';
import { dataTypeValidator } from '../validators/validator-functions';
import Field from '../common-types/field';
import ComponentMapper from '../common-types/component-mapper';
import { ActionMapper } from '../form-renderer/action-mapper';
import { ValidatorFunction } from '../validators';

interface GetValidatesOptions {
  componentMapper: ComponentMapper;
  actionMapper?: ActionMapper;
  values: Record<string, any>;
}

interface Validations {
  [fieldName: string]: ValidatorFunction[][];
}

const getValidates = (
  field: Field | Field[],
  { componentMapper, actionMapper, values }: GetValidatesOptions,
  validations: Validations = {}
): Validations => {
  if (Array.isArray(field)) {
    field.forEach((fieldItem) => getValidates(fieldItem, { componentMapper, actionMapper, values }, validations));
  } else {
    if (field.component) {
      let validate: ValidatorFunction[] | undefined;

      const { componentProps, overrideProps, mergedResolveProps } = prepareComponentProps({
        component: field.component,
        rest: field,
        componentMapper,
        actionMapper,
      });

      let resolveProps = mergedResolveProps || overrideProps.resolveProps || componentProps.resolveProps;

      // fake form state with only values
      if (resolveProps) {
        const resolvedProps = resolveProps(field, { input: { value: get(values, field.name) }, meta: {} }, { getState: () => ({ values }) });

        validate = resolvedProps?.validate;
      }

      validate = validate || overrideProps.validate || componentProps.validate;

      if (field.dataType) {
        validate = [...(validate || []), dataTypeValidator(field.dataType)[field.dataType]()];
      }

      if (validate) {
        if (validations[field.name]) {
          validations[field.name].push(validate);
        } else {
          validations[field.name] = [validate];
        }
      }
    }

    if (field.fields) {
      getValidates(field.fields, { componentMapper, actionMapper, values }, validations);
    }
  }

  return validations;
};

export default getValidates;
