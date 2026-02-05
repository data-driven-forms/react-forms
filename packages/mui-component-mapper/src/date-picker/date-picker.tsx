import React from 'react';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers';
import type { DatePickerProps as MUIDatePickerProps } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

export interface DatePickerProps extends BaseFieldProps {
  placeholder?: string;
  FormFieldGridProps?: FormFieldGridProps;
  DatePickerProps?: Omit<MUIDatePickerProps<Date>, 'value' | 'onChange' | 'disabled' | 'readOnly'>;
  [key: string]: any;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
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
    ...rest
  } = useFieldApi(props);

  const invalid = validationError(meta as ExtendedFieldMeta, validateOnMount);

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
        disabled={isDisabled || isReadOnly}
        readOnly={isReadOnly}
        {...input}
        value={input.value || null}
        {...DatePickerProps}
        {...rest}
      />
    </FormFieldGrid>
  );
};

export default DatePicker;
