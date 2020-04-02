import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as AntDatePicker } from 'antd';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import AntForm from '../common/form-wrapper';

const DatePicker = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, description, validateOnMount, meta } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);
  const placeholderDisplay = placeholder ? placeholder : 'Select date';
  const help = invalid || helperText || description;
  return (
    <AntForm layout="vertical" isRequired={isRequired} label={label} invalid={invalid} help={help}>
      <AntDatePicker
        disabled={isDisabled || isReadOnly}
        defaultValue={input.value ? input.value : undefined}
        placeholder={placeholderDisplay}
        required={isRequired}
        error={!!invalid}
        readOnly={isReadOnly}
        {...input}
        value={input.value || null}
      />
    </AntForm>
  );
};

DatePicker.propTypes = {
  input,
  meta,
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
