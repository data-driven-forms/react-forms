import React, { useContext, ReactNode } from 'react';
import setWith from 'lodash/setWith';
import cloneDeep from 'lodash/cloneDeep';
import { Field } from 'react-final-form';
import RendererContext from '../renderer-context';
import Condition from '../condition';
import getConditionTriggers from '../get-condition-triggers';
import prepareComponentProps from '../prepare-component-props';
import FieldType from '../common-types/field';
import { ConditionDefinition } from '../condition';
import { ConditionMapper } from './condition-mapper';

interface FormFieldHideWrapperProps {
  hideField?: boolean;
  children: ReactNode;
}

const FormFieldHideWrapper: React.FC<FormFieldHideWrapperProps> = ({ hideField = false, children }) =>
  hideField ? <div hidden>{children}</div> : children;

interface ConditionTriggerWrapperProps {
  condition: ConditionDefinition | ConditionDefinition[];
  values: Record<string, any>;
  children: ReactNode;
  field: FieldType;
}

const ConditionTriggerWrapper: React.FC<ConditionTriggerWrapperProps> = ({ condition, values, children, field }) => (
  <Condition condition={condition} values={values} field={field}>
    {children}
  </Condition>
);

interface ConditionTriggerDetectorProps {
  values?: Record<string, any>;
  triggers?: string[];
  children: ReactNode;
  condition: ConditionDefinition | ConditionDefinition[];
  field: FieldType;
}

const ConditionTriggerDetector: React.FC<ConditionTriggerDetectorProps> = ({ values = {}, triggers = [], children, condition, field }) => {
  const internalTriggers = [...triggers];
  if (internalTriggers.length === 0) {
    return (
      <ConditionTriggerWrapper condition={condition} values={values} field={field}>
        {children}
      </ConditionTriggerWrapper>
    );
  }

  const name = internalTriggers.shift()!;
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

interface FormConditionWrapperProps {
  condition?: ConditionDefinition | ConditionDefinition[];
  children: ReactNode;
  field: FieldType;
  conditionMapper?: ConditionMapper;
}

const FormConditionWrapper: React.FC<FormConditionWrapperProps> = ({ condition, children, field, conditionMapper }) => {
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

interface SingleFieldProps {
  component: string;
  [key: string]: any;
}

const SingleField: React.FC<SingleFieldProps> = ({ component, ...rest }) => {
  const { actionMapper, componentMapper, conditionMapper } = useContext(RendererContext);

  const { componentProps, Component, overrideProps, mergedResolveProps } = prepareComponentProps({
    component,
    rest,
    componentMapper,
    actionMapper,
  });

  const combinedProps = {
    ...componentProps,
    ...overrideProps,
    ...(mergedResolveProps && { resolveProps: mergedResolveProps }),
  };

  interface CombinedPropsWithOptionals {
    condition?: ConditionDefinition | ConditionDefinition[];
    hideField?: boolean;
    [key: string]: any;
  }

  const typedCombinedProps = combinedProps as CombinedPropsWithOptionals;
  const condition = typedCombinedProps.condition;
  const hideField = typedCombinedProps.hideField;
  const { condition: _condition, hideField: _hideField, ...restProps } = typedCombinedProps;

  return (
    <FormConditionWrapper condition={condition} field={{ component, name: rest.name, ...rest }} conditionMapper={conditionMapper}>
      <FormFieldHideWrapper hideField={hideField}>
        <Component {...restProps} />
      </FormFieldHideWrapper>
    </FormConditionWrapper>
  );
};

const renderForm = (fields: FieldType[]): ReactNode[] =>
  fields.map((field) => (Array.isArray(field) ? renderForm(field) : <SingleField key={field.name} {...field} />));

export default renderForm;
