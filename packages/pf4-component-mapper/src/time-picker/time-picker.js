import React from 'react';
import FormGroup from '../form-group/form-group';
import { TimePicker as PF4TimePicker } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const TimePicker = (props) => {
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
      <PF4TimePicker
        {...input}
        onChange={(_e, value) => input.onChange(value)}
        time={input.value ? input.value : undefined}
        {...rest}
        id={id || input.name}
        isDisabled={isDisabled || isReadOnly}
      />
    </FormGroup>
  );
};

export default TimePicker;
