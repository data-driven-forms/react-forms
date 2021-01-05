import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { Grid, Checkbox, FormControlLabel, FormLabel, FormGroup, FormControl, FormHelperText } from '@material-ui/core';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';
import { validationError } from '../common/helpers';

const CheckboxContext = createContext({});

const FinalCheckbox = ({ label, isDisabled: _isDisabled, ...rest }) => {
  const {
    FormControlLabelProps,
    CheckboxProps,
    props: { isRequired, isReadOnly, helperText, validate, isDisabled, ...props }
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

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node
};

const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText, description }) => {
  const invalid = validationError(meta, validateOnMount);
  const { FormFieldGridProps, FormControlProps, FormLabelProps, FormGroupProps, FormHelperTextProps } = useContext(CheckboxContext);
  return (
    <Grid container {...FormFieldGridProps}>
      <FormControl required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormLabel {...FormLabelProps}>{label}</FormLabel>
        <FormGroup {...FormGroupProps}>{children}</FormGroup>
        {(invalid || helperText || description) && <FormHelperText {...FormHelperTextProps}>{invalid || helperText || description}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = ({
  FormControlProps,
  FormLabelProps,
  FormGroupProps,
  FormHelperTextProps,
  FormFieldGridProps,
  FormControlLabelProps,
  CheckboxProps,
  ...props
}) => (
  <CheckboxContext.Provider
    value={{ FormControlProps, FormLabelProps, FormGroupProps, FormHelperTextProps, FormFieldGridProps, FormControlLabelProps, CheckboxProps, props }}
  >
    <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />
  </CheckboxContext.Provider>
);

MultipleChoiceList.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  FormFieldGridProps: PropTypes.object,
  FormControlProps: PropTypes.object,
  FormGroupProps: PropTypes.object,
  FormControlLabelProps: PropTypes.object,
  CheckboxProps: PropTypes.object,
  FormLabelProps: PropTypes.object,
  FormHelperTextProps: PropTypes.object
};
MultipleChoiceList.defaultProps = {
  FormFieldGridProps: {},
  FormControlProps: {},
  FormGroupProps: {},
  FormControlLabelProps: {},
  CheckboxProps: {},
  FormLabelProps: {},
  FormHelperTextProps: {}
};

export default MultipleChoiceList;
