import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, FormHelperText, FormControl, FormGroup, FormLabel, Switch as MUISwitch } from '@mui/material';
import { meta, input } from '@data-driven-forms/common/prop-types-templates';

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
    FormFieldGridProps,
    FormControlProps,
    FormGroupProps,
    FormControlLabelProps,
    SwitchProps,
    FormLabelProps,
    FormHelperTextProps,
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

Switch.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  onText: PropTypes.node,
  offText: PropTypes.node,
  description: PropTypes.node,
  FormFieldGridProps: PropTypes.object,
  FormControlProps: PropTypes.object,
  FormGroupProps: PropTypes.object,
  FormControlLabelProps: PropTypes.object,
  SwitchProps: PropTypes.object,
  FormLabelProps: PropTypes.object,
  FormHelperTextProps: PropTypes.object,
};

Switch.defaultProps = {
  FormFieldGridProps: {},
  FormControlProps: {},
  FormGroupProps: {},
  FormControlLabelProps: {},
  SwitchProps: {},
  FormLabelProps: {},
  FormHelperTextProps: {},
};

export default Switch;
