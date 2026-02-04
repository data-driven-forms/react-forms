import React from 'react';
import { useFieldApi, AnyObject, UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { OptionValue, SelectOption } from '../types/shared-types';

/**
 * Option interface for multiple choice lists
 */
export interface MultipleChoiceOption<T = OptionValue> {
  value: T;
  label: string;
  'aria-label'?: string;
}

/**
 * Props for wrapper component in multiple choice list
 */
export interface MultipleChoiceWrapperProps {
  showError: boolean;
  isRequired?: boolean;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  meta: Record<string, unknown>;
  description?: React.ReactNode;
  rest: Record<string, unknown>;
  error?: string;
  name: string;
  children: React.ReactNode;
}

/**
 * Props for checkbox component in multiple choice list
 */
export interface MultipleChoiceCheckboxProps<T = OptionValue> {
  value: T;
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (value: T) => void;
  'aria-label'?: string;
  id?: string;
  isDisabled?: boolean;
  option?: MultipleChoiceOption<T>;
}

export interface MultipleChoiceListProps<
  T = OptionValue,
  WrapperProps extends MultipleChoiceWrapperProps = MultipleChoiceWrapperProps,
  CheckBoxProps extends MultipleChoiceCheckboxProps<T> = MultipleChoiceCheckboxProps<T>
> extends UseFieldApiConfig {
  Wrapper: React.ComponentType<WrapperProps>;
  Checkbox: React.ComponentType<CheckBoxProps>;
  options: MultipleChoiceOption<T>[];
}

interface SingleCheckboxProps<T = OptionValue> extends Omit<UseFieldApiConfig, 'component' | 'type'> {
  Checkbox: React.ComponentType<MultipleChoiceCheckboxProps<T>>;
  value: T;
  label: string;
  option?: MultipleChoiceOption<T>;
  'aria-label'?: string;
  isDisabled?: boolean;
}

const SingleCheckbox = <T extends OptionValue = OptionValue>(props: SingleCheckboxProps<T>) => {
  const { input, Checkbox, ...rest } = useFieldApi({ ...props, type: 'checkbox', component: 'checkbox', name: props.name });

  return <Checkbox {...input} {...rest} />;
};

const MultipleChoiceList = <T extends OptionValue = OptionValue>(
  props: MultipleChoiceListProps<T>
) => {
  const { Wrapper, Checkbox, label, validateOnMount, isRequired, helperText, meta, input, options, isDisabled, isReadOnly, description, ...rest } =
    useFieldApi(props);

  const { error, touched, submitError } = meta;
  const showError = Boolean((touched || validateOnMount) && (error || submitError));

  return (
    <Wrapper
      showError={showError}
      isRequired={isRequired}
      label={label}
      helperText={helperText}
      meta={meta}
      description={description}
      rest={rest}
      error={error || submitError}
      name={input.name}
    >
      {options.map((option: MultipleChoiceOption<T>) => (
        <SingleCheckbox<T>
          Checkbox={Checkbox}
          aria-label={option['aria-label'] || option.label}
          {...rest}
          value={option.value}
          label={option.label}
          name={input.name}
          option={option}
          id={`${rest.id || input.name}-${String(option.value)}`}
          key={`${rest.id || input.name}-${String(option.value)}`}
          isDisabled={isDisabled || isReadOnly}
        />
      ))}
    </Wrapper>
  );
};

export const wrapperProps: AnyObject = {};
export default MultipleChoiceList;
