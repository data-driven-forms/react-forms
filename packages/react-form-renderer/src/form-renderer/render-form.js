import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { childrenPropTypes } from '@data-driven-forms/common/src/prop-types-templates';
import RendererContext from '../files/renderer-context';
import Condition from './condition';
import FormSpy from '../files/form-spy';

const FormFieldHideWrapper = ({ hideField, children }) => (hideField ? <div hidden>{children}</div> : children);

FormFieldHideWrapper.propTypes = {
  hideField: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
};

FormFieldHideWrapper.defaultProps = {
  hideField: false
};

const FormConditionWrapper = ({ condition, children }) =>
  condition ? (
    <FormSpy>
      {({ values }) => (
        <Condition condition={condition} values={values}>
          {children}
        </Condition>
      )}
    </FormSpy>
  ) : (
    children
  );

FormConditionWrapper.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: childrenPropTypes.isRequired
};

const SingleField = ({ component, condition, hideField, ...rest }) => {
  const { componentMapper } = useContext(RendererContext);

  let componentProps = {
    component,
    ...rest
  };

  const componentBinding = componentMapper[component];
  let Component;
  if (typeof componentBinding === 'object' && Object.prototype.hasOwnProperty.call(componentBinding, 'component')) {
    const { component, ...mapperProps } = componentBinding;
    Component = component;
    componentProps = { ...mapperProps, ...componentProps };
  } else {
    Component = componentBinding;
  }

  return (
    <FormConditionWrapper condition={condition}>
      <FormFieldHideWrapper hideField={hideField}>
        <Component {...componentProps} />
      </FormFieldHideWrapper>
    </FormConditionWrapper>
  );
};

SingleField.propTypes = {
  component: PropTypes.string.isRequired,
  condition: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hideField: PropTypes.bool,
  dataType: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
  initialValue: PropTypes.any
};

const renderForm = (fields) => fields.map((field) => (Array.isArray(field) ? renderForm(field) : <SingleField key={field.name} {...field} />));

export default renderForm;
