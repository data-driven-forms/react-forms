import React from 'react';
import { TimePicker as AntTimePicker } from 'antd';
import { validationError } from '../validation-error/validation-error';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group';

const TimePicker = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder = 'Select date',
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    FormItemProps,
    ...rest
  } = useFieldApi(props);
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
      <AntTimePicker
        use12Hours={true}
        format="h:mm a"
        disabled={isDisabled || isReadOnly}
        placeholder={placeholder}
        required={isRequired}
        error={!!invalid}
        readOnly={isReadOnly}
        defaultValue={input.value ? input.value : undefined}
        {...input}
        value={input.value || null}
        id={input.name}
        {...rest}
      />
    </FormGroup>
  );
};

export default TimePicker;
