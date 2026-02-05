import React from 'react';
import { FormControlLabel, FormHelperText, FormControl, FormGroup, FormLabel, Switch as MUISwitch } from '@mui/material';
import type {
  FormControlLabelProps,
  FormHelperTextProps,
  FormControlProps,
  FormGroupProps,
  FormLabelProps,
  SwitchProps as MUISwitchProps,
} from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

export interface SwitchProps extends BaseFieldProps {
  onText?: string;
  offText?: string;
  FormFieldGridProps?: FormFieldGridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  SwitchProps?: MUISwitchProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  [key: string]: any;
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    onText,
    offText,
    FormFieldGridProps = {},
    FormControlProps = {},
    FormGroupProps = {},
    FormControlLabelProps = {},
    SwitchProps = {},
    FormLabelProps = {},
    FormHelperTextProps = {},
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox',
  });

  const invalid = validationError(meta as ExtendedFieldMeta, validateOnMount);
  const text = invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description;

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <FormControl required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormGroup {...FormGroupProps}>
          <FormControlLabel
            control={
              <MUISwitch
                {...rest}
                {...input}
                readOnly={isReadOnly}
                disabled={isDisabled || isReadOnly}
                onChange={({ target: { checked } }) => input.onChange(checked)}
                {...SwitchProps}
              />
            }
            label={<FormLabel {...FormLabelProps}>{input.checked ? onText || label : offText || label}</FormLabel>}
            {...FormControlLabelProps}
          />
          {text && <FormHelperText {...FormHelperTextProps}>{text}</FormHelperText>}
        </FormGroup>
      </FormControl>
    </FormFieldGrid>
  );
};

export default Switch;
