import React from 'react';
import { Switch as Pf4Switch, SwitchProps } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import IsRequired from '../is-required/is-required';
import { BaseFieldProps } from '../types';

export interface SwitchFieldProps extends BaseFieldProps, Omit<SwitchProps, keyof BaseFieldProps | 'id' | 'isDisabled'> {
  onText?: string;
}

const Switch: React.FC<SwitchFieldProps> = (props) => {
  const { label, onText, isRequired, helperText, meta, validateOnMount, description, input, isReadOnly, isDisabled, id, FormGroupProps, ...rest } =
    useFieldApi({
      ...props,
      type: 'checkbox',
    });

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
      <Pf4Switch
        {...rest}
        {...input}
        id={id || input.name}
        isDisabled={isDisabled || isReadOnly}
        label={isRequired ? <IsRequired>{onText || label}</IsRequired> : onText || label}
      />
    </FormGroup>
  );
};

export default Switch;

// Export the props type for external use
export type { SwitchProps } from '../types';
