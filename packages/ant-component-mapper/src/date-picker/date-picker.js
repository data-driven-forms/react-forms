import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { validationError } from '../validation-error/validation-error';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group';

const DatePicker = ({ placeholder = 'Select date', ...props }) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta, FormItemProps, ...rest } =
    useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormGroup
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
      input={input}
    >
      <AntDatePicker
        disabled={isDisabled || isReadOnly}
        defaultValue={input.value ? input.value : undefined}
        placeholder={placeholder}
        required={isRequired}
        error={!!invalid}
        readOnly={isReadOnly}
        {...input}
        value={input.value || null}
        id={input.name}
        {...rest}
      />
    </FormGroup>
  );
};

export default DatePicker;
