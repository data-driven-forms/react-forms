import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as AntDatePicker } from 'antd';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group';

const DatePicker = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
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
        {...rest}
      />
    </FormGroup>
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
  description: PropTypes.node,
  FormItemProps: PropTypes.object
};

DatePicker.defaultProps = {
  placeholder: 'Select date'
};

export default DatePicker;
