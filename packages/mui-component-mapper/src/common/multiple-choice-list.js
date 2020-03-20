import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Checkbox, FormControlLabel, FormLabel, FormGroup, FormControl, FormHelperText } from '@material-ui/core';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import { validationError } from './helpers';

const FinalCheckbox = ({ isDisabled, label, ...props }) => (
  <FormControlLabel
    control={
      <Checkbox {...props} disabled={isDisabled}>
        {label}
      </Checkbox>
    }
    label={label}
  />
);

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node
};

const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText, description }) => {
  const invalid = validationError(meta, validateOnMount);

  return (
    <Grid container>
      <FormControl required={isRequired} error={!!invalid} component="fieldset">
        <FormLabel>{label}</FormLabel>
        <FormGroup>{children}</FormGroup>
        {(invalid || helperText || description) && <FormHelperText>{invalid || helperText || description}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

MultipleChoiceList.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

export default MultipleChoiceList;
