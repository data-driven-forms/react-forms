import React from 'react';

import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
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
    FormFieldGridProps = {},
    DatePickerProps = {},
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
            onBlur: input.onBlur,
            onFocus: input.onFocus,
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

export default DatePicker;
