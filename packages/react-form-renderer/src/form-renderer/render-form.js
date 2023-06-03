import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import setWith from 'lodash/setWith';
import cloneDeep from 'lodash/cloneDeep';
import { Field } from 'react-final-form';
import RendererContext from '../renderer-context';
import Condition from '../condition';
import getConditionTriggers from '../get-condition-triggers';
import prepareComponentProps from '../prepare-component-props';

const FormFieldHideWrapper = ({ hideField, children }) => (hideField ? <div hidden>{children}</div> : children);

FormFieldHideWrapper.propTypes = {
  hideField: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

FormFieldHideWrapper.defaultProps = {
  hideField: false,
};

const ConditionTriggerWrapper = ({ condition, values, children, field }) => (
  <Condition condition={condition} values={values} field={field}>
    {children}
  </Condition>
);

ConditionTriggerWrapper.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node.isRequired,
  field: PropTypes.object,
  values: PropTypes.object.isRequired,
};

const ConditionTriggerDetector = ({ values = {}, triggers = [], children, condition, field }) => {
  const internalTriggers = [...triggers];
  if (internalTriggers.length === 0) {
    return (
      <ConditionTriggerWrapper condition={condition} values={values} field={field}>
        {children}
      </ConditionTriggerWrapper>
    );
  }

  const name = internalTriggers.shift();
  return (
    <Field name={name} subscription={{ value: true, initial: true }}>
      {({ input: { value } }) => (
        <ConditionTriggerDetector
          triggers={[...internalTriggers]}
          values={setWith(cloneDeep(values), name, value, Object)}
          condition={condition}
          field={field}
        >
          {children}
        </ConditionTriggerDetector>
      )}
    </Field>
  );
};

ConditionTriggerDetector.propTypes = {
  values: PropTypes.object,
  triggers: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  condition: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  field: PropTypes.object.isRequired,
};

const FormConditionWrapper = ({ condition, children, field }) => {
  if (condition) {
    const triggers = getConditionTriggers(condition, field);
    return (
      <ConditionTriggerDetector triggers={triggers} condition={condition} field={field}>
        {children}
      </ConditionTriggerDetector>
    );
  }

  return children;
};

FormConditionWrapper.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node.isRequired,
  field: PropTypes.object,
};

const SingleField = ({ component, ...rest }) => {
  const { actionMapper, componentMapper } = useContext(RendererContext);

  const { componentProps, Component, overrideProps, mergedResolveProps } = prepareComponentProps({ component, rest, componentMapper, actionMapper });

  const { condition, hideField, ...restProps } = {
    ...componentProps,
    ...overrideProps,
    ...(mergedResolveProps && { resolveProps: mergedResolveProps }),
  };

  return (
    <FormConditionWrapper condition={condition} field={restProps}>
      <FormFieldHideWrapper hideField={hideField}>
        <Component {...restProps} />
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
    [PropTypes.string]: PropTypes.func,
  }),
  resolveProps: PropTypes.func,
};

const renderForm = (fields) => fields.map((field) => (Array.isArray(field) ? renderForm(field) : <SingleField key={field.name} {...field} />));

export default renderForm;
