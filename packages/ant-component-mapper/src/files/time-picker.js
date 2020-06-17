import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker as AntTimePicker } from 'antd';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import AntForm from '../common/form-wrapper';

const DatePicker = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, description, validateOnMount, meta } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);
  const placeholderDisplay = placeholder ? placeholder : 'Select time';
  const help = invalid || helperText || description;
  return (
    <AntForm layout="vertical" isRequired={isRequired} label={label} invalid={invalid} help={help}>
      <AntTimePicker
        use12Hours={true}
        format="h:mm a"
        disabled={isDisabled || isReadOnly}
        placeholder={placeholderDisplay}
        required={isRequired}
        error={!!invalid}
        readOnly={isReadOnly}
        defaultValue={input.value ? input.value : undefined}
        {...input}
        value={input.value || null}
      />
    </AntForm>
  );
};

DatePicker.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  locale: PropTypes.string,
  description: PropTypes.node
};

export default DatePicker;