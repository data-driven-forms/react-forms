import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import MultipleChoiceList from '@data-driven-forms/common/src/multiple-choice-list';
import { Checkbox, FormGroup, Intent } from '@blueprintjs/core';

import FormGroupWrapper from './form-group';
import propsCatcher from '../common/props-catcher';
import BlueprintContext from './blueprint-context';

const SingleCheckbox = ({ input, isDisabled, label, providerRequired, ...props }) => (
  <Checkbox
    label={label}
    {...propsCatcher(props)}
    {...(props.isRequired && {
      label: (
        <span>
          {label} {providerRequired}
        </span>
      )
    })}
    {...(isDisabled && { disabled: true })}
    {...input}
  />
);

SingleCheckbox.propTypes = {
  input: PropTypes.object,
  isDisabled: PropTypes.bool,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  providerRequired: PropTypes.node
};

const Wrapper = ({ children, isRequired, showError, error, validateOnMount, ...props }) => {
  const { required } = useContext(BlueprintContext);

  return (
    <FormGroup
      {...props}
      {...(isRequired && { labelInfo: required })}
      {...(error && (showError || validateOnMount) && { helperText: error, intent: Intent.DANGER })}
    >
      {children}
    </FormGroup>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  isRequired: PropTypes.bool,
  showError: PropTypes.bool,
  error: PropTypes.string,
  validateOnMount: PropTypes.bool
};

const WrapperCheckbox = (props) =>
  props.options ? (
    <MultipleChoiceList {...props} Wrapper={Wrapper} Checkbox={SingleCheckbox} />
  ) : (
    <FormGroupWrapper {...props} hideLabel Component={SingleCheckbox} />
  );

WrapperCheckbox.propTypes = {
  options: PropTypes.array
};

export default WrapperCheckbox;
