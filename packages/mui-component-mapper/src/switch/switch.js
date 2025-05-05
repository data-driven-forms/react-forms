import React from 'react';
import { FormControlLabel, FormHelperText, FormControl, FormGroup, FormLabel, Switch as MUISwitch } from '@mui/material';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const Switch = (props) => {
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
  const invalid = validationError(meta, validateOnMount);
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
