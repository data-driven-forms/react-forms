import React from 'react';
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { TextField } from '@mui/material';

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
    MuiPickersUtilsProviderProps,
    FormFieldGridProps = {},
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <MUITimePicker
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
        readOnly={isReadOnly}
        disabled={isDisabled || isReadOnly}
        {...input}
        value={input.value || null}
        {...rest}
      />
    </FormFieldGrid>
  );
};

export default TimePicker;
