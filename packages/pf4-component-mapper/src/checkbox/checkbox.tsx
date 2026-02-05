import React from 'react';
import MultipleChoiceList from './multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import { Checkbox as Pf4Checkbox, CheckboxProps } from '@patternfly/react-core';
import IsRequired from '../is-required/is-required';
import { BaseFieldProps, SelectOption } from '../types';

export interface CheckboxFieldProps extends BaseFieldProps, Omit<CheckboxProps, keyof BaseFieldProps | 'id' | 'isChecked' | 'onChange'> {
  options?: SelectOption[];
}

const SingleCheckbox: React.FC<CheckboxFieldProps> = (props) => {
  const { label, isRequired, helperText, meta, validateOnMount, description, input, isReadOnly, isDisabled, id, FormGroupProps, ...rest } =
    useFieldApi(props);

  return (
    <FormGroup
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <Pf4Checkbox
        isChecked={input.checked}
        {...input}
        id={id || input.name}
        label={isRequired ? <IsRequired>{label}</IsRequired> : label}
        aria-label={rest.name}
        {...rest}
        isDisabled={isDisabled || isReadOnly}
      />
    </FormGroup>
  );
};

const Checkbox: React.FC<CheckboxFieldProps> = ({ options, ...props }) =>
  options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />;

export default Checkbox;

// Export the props type for external use
export type { CheckboxProps } from '../types';
