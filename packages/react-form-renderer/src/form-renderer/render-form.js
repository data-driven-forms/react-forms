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

const FormConditionWrapper = ({ condition, children, field }) =>
  condition ? (
    <FormSpy>
      {({ values }) => (
        <Condition condition={condition} values={values} field={field}>
          {children}
        </Condition>
      )}
    </FormSpy>
  ) : (
    children
  );

FormConditionWrapper.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: childrenPropTypes.isRequired,
  field: PropTypes.object
};

const SingleField = ({ component, condition, hideField, ...rest }) => {
  const { actionMapper, componentMapper } = useContext(RendererContext);

  let componentProps = {
    component,
    ...rest
  };

  const componentBinding = componentMapper[component];
  let Component;
  if (typeof componentBinding === 'object' && Object.prototype.hasOwnProperty.call(componentBinding, 'component')) {
    const { component, ...mapperProps } = componentBinding;
    Component = component;
    componentProps = {
      ...mapperProps,
      ...componentProps,
      // merge mapper and field actions
      ...(mapperProps.actions && rest.actions ? { actions: { ...mapperProps.actions, ...rest.actions } } : {}),
      // merge mapper and field resolveProps
      ...(mapperProps.resolveProps && rest.resolveProps
        ? {
            resolveProps: (...args) => ({
              ...mapperProps.resolveProps(...args),
              ...rest.resolveProps(...args)
            })
          }
        : {})
    };
  } else {
    Component = componentBinding;
  }

  /**
   * Map actions to props
   */
  let overrideProps = {};
  let mergedResolveProps; // new object has to be created because of references
  if (componentProps.actions) {
    Object.keys(componentProps.actions).forEach((prop) => {
      const [action, ...args] = componentProps.actions[prop];
      overrideProps[prop] = actionMapper[action](...args);
    });

    // Merge componentProps resolve props and actions resolve props
    if (componentProps.resolveProps && overrideProps.resolveProps) {
      mergedResolveProps = (...args) => ({
        ...componentProps.resolveProps(...args),
        ...overrideProps.resolveProps(...args)
      });
    }

    // do not pass actions object to components
    delete componentProps.actions;
  }

  return (
    <FormConditionWrapper condition={condition} field={componentProps}>
      <FormFieldHideWrapper hideField={hideField}>
        <Component {...componentProps} {...overrideProps} {...(mergedResolveProps && { resolveProps: mergedResolveProps })} />
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
  initialValue: PropTypes.any,
  actions: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  }),
  resolveProps: PropTypes.func
};

const renderForm = (fields) => fields.map((field) => (Array.isArray(field) ? renderForm(field) : <SingleField key={field.name} {...field} />));

export default renderForm;
