import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { childrenPropTypes } from '@data-driven-forms/common/src/prop-types-templates';
import { dataTypeValidator } from '../validators';
import validatorMapper from '../validators/validator-mapper';
import RendererContext from '../components/renderer-context';
import Condition from './condition';
import { memoize } from '../validators/helpers';
import FieldWrapper from './field-wrapper';

const FormFieldHideWrapper = ({ hideField, children }) => (hideField ? <div hidden>{children}</div> : children);

FormFieldHideWrapper.propTypes = {
  hideField: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
};

FormFieldHideWrapper.defaultProps = {
  hideField: false
};

const FormConditionWrapper = ({ condition, children }) => (condition ? <Condition condition={condition}>{children}</Condition> : children);

FormConditionWrapper.propTypes = {
  condition: PropTypes.object,
  children: childrenPropTypes.isRequired
};

const SingleField = ({ component, condition, hideField, ...rest }) => (
  <Fragment key={rest.key || rest.name}>
    <RendererContext.Consumer>
      {({ formFieldsMapper }) => (
        <FormConditionWrapper condition={condition}>
          <FormFieldHideWrapper hideField={hideField}>
            <FieldWrapper componentType={component} component={formFieldsMapper[component]} name={rest.name || rest.key} {...rest} />
          </FormFieldHideWrapper>
        </FormConditionWrapper>
      )}
    </RendererContext.Consumer>
  </Fragment>
);

SingleField.propTypes = {
  component: PropTypes.string.isRequired,
  condition: PropTypes.object,
  hideField: PropTypes.bool
};

const prepareValidator = (validator) => (typeof validator === 'function' ? memoize(validator) : validatorMapper(validator.type)({ ...validator }));

const prepareFieldProps = (field) => ({
  ...field,
  validate: field.validate
    ? [...field.validate.map((validator) => prepareValidator(validator)), field.dataType && dataTypeValidator(field.dataType)()]
    : [field.dataType && dataTypeValidator(field.dataType)()]
});

const renderForm = (fields) =>
  fields.map((field) => (Array.isArray(field) ? renderForm(field) : <SingleField key={fields.name} {...prepareFieldProps(field)} />));

export default renderForm;
