import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { dataTypeValidator } from '../validators';
import validatorMapper from '../validators/validator-mapper';
import RendererContext from './renderer-context';
import Condition from './condition';
import { memoize } from '../validators/helpers';
import FieldWrapper from './field-wrapper';

const FormFieldHideWrapper = ({ hideField, children }) => hideField ? (
  <div hidden>{ children }</div>
) : children;

FormFieldHideWrapper.propTypes = {
  hideField: PropTypes.bool,
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
};

FormFieldHideWrapper.defaultProps = {
  hideField: false,
};

const FormConditionWrapper = ({ condition, children }) => (condition ? (
  <Condition condition={ condition }>
    { children }
  </Condition>
) : children);

const renderSingleField = ({ component, condition, hideField, ...rest }) => (
  <Fragment key={ rest.key || rest.name }>
    <RendererContext.Consumer>
      { ({ formFieldsMapper, formOptions }) => (
        <FormConditionWrapper condition={ condition }>
          <FormFieldHideWrapper hideField={ hideField }>
            <FieldWrapper
              componentType={ component }
              component={ formFieldsMapper[component] }
              formOptions={ formOptions }
              name={ rest.name || rest.key }
              { ...rest }
            />
          </FormFieldHideWrapper>
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
