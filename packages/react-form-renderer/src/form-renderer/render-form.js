import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { dataTypeValidator } from '../validators';
import validatorMapper from '../validators/validator-mapper';
import RendererContext from './renderer-context';
import Condition from './condition';
import { memoize } from '../validators/helpers';
import FieldWrapper from './field-wrapper';

const FormConditionWrapper = ({ condition, children }) => (condition ? (
  <Condition { ...condition }>
    { children }
  </Condition>
) : children);

const renderSingleField = ({ component, condition, ...rest }) => (
  <Fragment key={ rest.key || rest.name }>
    <RendererContext.Consumer>
      { ({ formFieldsMapper, formOptions }) => (
        <FormConditionWrapper condition={ condition }>
          <FieldWrapper
            componentType={ component }
            component={ formFieldsMapper[component] }
            formOptions={ formOptions }
            name={ rest.name || rest.key }
            { ...rest }
          />
        </FormConditionWrapper>
      ) }
    </RendererContext.Consumer>
  </Fragment>
);

renderSingleField.propTypes = {
  component: PropTypes.string.isRequired,
};

const prepareValidator = (validator) => ((typeof validator === 'function')
  ? memoize(validator)
  : validatorMapper(validator.type)({ ...validator }));

const prepareFieldProps = field => ({
  ...field,
  dataType: undefined,
  validate: field.validate
    ? [
      ...field.validate.map((validator) => prepareValidator(validator)),
      field.dataType && dataTypeValidator(field.dataType)(),
    ]
    : [
      field.dataType && dataTypeValidator(field.dataType)(),
    ],
});

const renderForm = (fields) => fields.map(field => (Array.isArray(field)
  ? renderForm(field)
  : renderSingleField(prepareFieldProps(field))));

export default renderForm;
