import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';

const FinalCheckbox = (props) => (
  <FormControlLabel
    control={ <Checkbox
      { ...props }
      disabled={ props.isDisabled }
    >
      { props.label }
    </Checkbox> }
    label={ props.label }
  />
);

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node,
};

const Wrapper = ({ showError, label, error, children }) =>(
  <Grid container >
    <FormControl component="fieldset" >
      <FormLabel>{ label }</FormLabel>
      <FormGroup>
        { children }
      </FormGroup>
      <FormHelperText>{ showError ? error : null }</FormHelperText>
    </FormControl>
  </Grid>
);

Wrapper.propTypes = {
  ...wrapperProps,
};

const MultipleChoiceList = (props) => (
  <MultipleChoiceListCommon
    { ...props }
    Wrapper={ Wrapper }
    Checkbox={ FinalCheckbox }
  />
);

export default MultipleChoiceList;
