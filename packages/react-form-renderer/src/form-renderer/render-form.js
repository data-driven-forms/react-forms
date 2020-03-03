import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { childrenPropTypes } from '@data-driven-forms/common/src/prop-types-templates';
import { dataTypeValidator } from '../validators';
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

const prepareValidator = (validator, mapper) => (typeof validator === 'function' ? memoize(validator) : mapper[validator.type]({ ...validator }));

const getValidate = (validate, dataType, mapper) => ({
  validate: validate
    ? [...validate.map((validator) => prepareValidator(validator, mapper)), dataType && dataTypeValidator(dataType)()]
    : [dataType && dataTypeValidator(dataType)()]
});

const SingleField = ({ component, condition, hideField, validate, ...rest }) => {
  const { componentMapper, validatorMapper } = useContext(RendererContext);

  return (
    <Fragment key={rest.key || rest.name}>
      <FormConditionWrapper condition={condition}>
        <FormFieldHideWrapper hideField={hideField}>
          <FieldWrapper
            componentType={component}
            component={componentMapper[component]}
            name={rest.name || rest.key}
            {...rest}
            {...(validate || rest.dataType ? getValidate(validate, rest.dataType, validatorMapper) : {})}
          />
        </FormFieldHideWrapper>
      </FormConditionWrapper>
    </Fragment>
  );
};

SingleField.propTypes = {
  component: PropTypes.string.isRequired,
  condition: PropTypes.object,
  hideField: PropTypes.bool,
  dataType: PropTypes.string,
  validate: PropTypes.array
};

const renderForm = (fields) => fields.map((field) => (Array.isArray(field) ? renderForm(field) : <SingleField key={field.name} {...field} />));

export default renderForm;
