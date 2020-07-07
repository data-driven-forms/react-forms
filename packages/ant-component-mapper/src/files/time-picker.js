import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker as AntTimePicker } from 'antd';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import AntForm from '../common/form-wrapper';

const TimePicker = (props) => {
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
    <AntForm
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
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
        {...rest}
      />
    </AntForm>
  );
};

TimePicker.propTypes = {
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

TimePicker.defaultProps = {
  placeholder: 'Select date'
};

export default TimePicker;
