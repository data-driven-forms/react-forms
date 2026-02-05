import React from 'react';
import { TextInput } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import FormGroup from '../form-group/form-group';
import showError from '../show-error/show-error';
import { BaseFieldProps, TextFieldProps } from '../types';

const TextField = (props: BaseFieldProps<TextFieldProps>) => {
  const {
    label,
    isRequired,
    helperText,
    meta,
    validateOnMount,
    description,
    hideLabel,
    input,
    isReadOnly,
    isDisabled,
    id,
    FormGroupProps,
    placeholder,
    type = 'text',
    ...rest
  } = useFieldApi(props);

  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <TextInput
        {...input}
        {...showError(meta, validateOnMount)}
        {...rest}
        id={id || input.name}
        isRequired={isRequired}
        isDisabled={isDisabled}
        readOnlyVariant={isReadOnly ? 'default' : undefined}
        placeholder={placeholder}
        type={type}
      />
    </FormGroup>
  );
};

export default TextField;

// Export the props type for external use
export type { TextFieldProps } from '../types';
