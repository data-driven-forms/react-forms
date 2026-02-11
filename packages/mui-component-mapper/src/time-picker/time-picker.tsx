import React from 'react';
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers';
import type { TimePickerProps as MUITimePickerProps } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

export interface TimePickerProps extends BaseFieldProps {
  placeholder?: string;
  FormFieldGridProps?: FormFieldGridProps;
  TimePickerProps?: Omit<MUITimePickerProps<Date>, 'value' | 'onChange' | 'disabled' | 'readOnly'>;
  MuiPickersUtilsProviderProps?: any; // Legacy prop for backward compatibility
  [key: string]: any;
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
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
    TimePickerProps = {},
    ...rest
  } = useFieldApi(props);

  const invalid = validationError(meta as ExtendedFieldMeta, validateOnMount);

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
          } as TextFieldProps,
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
        {...TimePickerProps}
        {...rest}
      />
    </FormFieldGrid>
  );
};

export default TimePicker;
