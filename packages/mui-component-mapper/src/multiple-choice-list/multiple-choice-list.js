import React, { createContext, useContext } from 'react';

import { Grid, Checkbox, FormControlLabel, FormLabel, FormGroup, FormControl, FormHelperText } from '@mui/material';

import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';
import { validationError } from '../validation-error/validation-error';

const CheckboxContext = createContext({});

const FinalCheckbox = ({ label, isDisabled: _isDisabled, ...rest }) => {
  const {
    FormControlLabelProps,
    CheckboxProps,
    props: { initialValue, isRequired, isReadOnly, helperText, validate, isDisabled, component, ...props },
  } = useContext(CheckboxContext);
  return (
    <FormControlLabel
      {...FormControlLabelProps}
      control={
        <Checkbox {...rest} {...props} {...CheckboxProps} disabled={isDisabled}>
          {label}
        </Checkbox>
      }
      label={label}
    />
  );
};

const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText, description }) => {
  const invalid = validationError(meta, validateOnMount);
  const { FormFieldGridProps, FormControlProps, FormLabelProps, FormGroupProps, FormHelperTextProps } = useContext(CheckboxContext);
  return (
    <Grid container item xs={12} {...FormFieldGridProps}>
      <FormControl required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormLabel {...FormLabelProps}>{label}</FormLabel>
        <FormGroup {...FormGroupProps}>{children}</FormGroup>
        {(invalid || helperText || description) && <FormHelperText {...FormHelperTextProps}>{invalid || helperText || description}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

const MultipleChoiceList = ({
  FormControlProps = {},
  FormLabelProps = {},
  FormGroupProps = {},
  FormHelperTextProps = {},
  FormFieldGridProps = {},
  FormControlLabelProps = {},
  CheckboxProps = {},
  ...props
}) => (
  <CheckboxContext.Provider
    value={{ FormControlProps, FormLabelProps, FormGroupProps, FormHelperTextProps, FormFieldGridProps, FormControlLabelProps, CheckboxProps, props }}
  >
    <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />
  </CheckboxContext.Provider>
);

export default MultipleChoiceList;
