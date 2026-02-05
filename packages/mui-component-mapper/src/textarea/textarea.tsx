import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

export interface TextareaProps extends BaseFieldProps {
  placeholder?: string;
  inputProps?: Record<string, any>;
  FormFieldGridProps?: FormFieldGridProps;
  TextFieldProps?: Omit<MuiTextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'onFocus'>;
  [key: string]: any;
}

const Textarea: React.FC<TextareaProps> = (props) => {
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
    inputProps = {},
    TextFieldProps = {},
    ...rest
  } = useFieldApi(props);

  const invalid = validationError(meta as ExtendedFieldMeta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <MuiTextField
        {...input}
        fullWidth
        error={!!invalid}
        helperText={invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description}
        disabled={isDisabled}
        label={label}
        placeholder={placeholder}
        required={isRequired}
        inputProps={{
          readOnly: isReadOnly,
          ...inputProps,
        }}
        {...TextFieldProps}
        {...rest}
        multiline
      />
    </FormFieldGrid>
  );
};

export default Textarea;
