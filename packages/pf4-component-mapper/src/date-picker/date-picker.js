import React from 'react';
import { DatePicker as PF4DatePicker } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';

const DatePicker = (props) => {
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
      <PF4DatePicker
        {...input}
        onChange={(_e, value) => input.onChange(value)}
        {...rest}
        id={id || input.name}
        isDisabled={isDisabled || isReadOnly}
      />
    </FormGroup>
  );
};

export default DatePicker;
