import React from 'react';
import FormGroup from '../form-group/form-group';
import { TextInput } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import showError from '../show-error/show-error';

const TextField = (props) => {
  const { label, isRequired, helperText, meta, validateOnMount, description, hideLabel, input, isReadOnly, isDisabled, id, FormGroupProps, ...rest } =
    useFieldApi(props);
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
      />
    </FormGroup>
  );
};

export default TextField;
