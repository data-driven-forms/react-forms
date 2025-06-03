import React, { useContext } from 'react';
import setWith from 'lodash/setWith';
import cloneDeep from 'lodash/cloneDeep';
import { Field } from '@hyperkid/react-final-form';
import RendererContext from '../renderer-context';
import Condition from '../condition';
import getConditionTriggers from '../get-condition-triggers';
import prepareComponentProps from '../prepare-component-props';

const FormFieldHideWrapper = ({ hideField = false, children }) => (hideField ? <div hidden>{children}</div> : children);

const ConditionTriggerWrapper = ({ condition, values, children, field }) => (
  <Condition condition={condition} values={values} field={field}>
    {children}
  </Condition>
);

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

const FormConditionWrapper = ({ condition, children, field, conditionMapper }) => {
  if (condition) {
    const triggers = getConditionTriggers(condition, field, conditionMapper);
    return (
      <ConditionTriggerDetector triggers={triggers} condition={condition} field={field}>
        {children}
      </ConditionTriggerDetector>
    );
  }

  return children;
};

const SingleField = ({ component, ...rest }) => {
  const { actionMapper, componentMapper, conditionMapper } = useContext(RendererContext);

  const { componentProps, Component, overrideProps, mergedResolveProps } = prepareComponentProps({ component, rest, componentMapper, actionMapper });

  const { condition, hideField, ...restProps } = {
    ...componentProps,
    ...overrideProps,
    ...(mergedResolveProps && { resolveProps: mergedResolveProps }),
  };

  return (
    <FormConditionWrapper condition={condition} field={restProps} conditionMapper={conditionMapper}>
      <FormFieldHideWrapper hideField={hideField}>
        <Component {...restProps} />
      </FormFieldHideWrapper>
    </FormConditionWrapper>
  );
};

const renderForm = (fields) => fields.map((field) => (Array.isArray(field) ? renderForm(field) : <SingleField key={field.name} {...field} />));

export default renderForm;
