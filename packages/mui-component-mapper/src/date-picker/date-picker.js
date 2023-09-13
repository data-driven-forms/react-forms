import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import { meta, input } from '@data-driven-forms/common/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { TextField } from '@mui/material';

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
    FormFieldGridProps,
    DatePickerProps,
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <MUIDatePicker
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'normal',
            label,
            helperText: invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description,
            placeholder,
            required: isRequired,
            error: !!invalid,
          },
        }}
        // legacy version
        renderInput={(props) => (
          <TextField
            {...props}
            fullWidth
            margin="normal"
            label={label}
            helperText={invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description}
            placeholder={placeholder}
            required={isRequired}
            error={!!invalid}
          />
        )}
        disabled={isDisabled || isReadOnly}
        readOnly={isReadOnly}
        {...input}
        value={input.value || null}
        {...DatePickerProps}
      />
    </FormFieldGrid>
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
  description: PropTypes.node,
  FormFieldGridProps: PropTypes.object,
  DatePickerProps: PropTypes.object,
};

DatePicker.defaultProps = {
  FormFieldGridProps: {},
  DatePickerProps: {},
};

export default DatePicker;
