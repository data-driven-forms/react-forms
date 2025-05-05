import React, { useContext } from 'react';

import MultipleChoiceList from '@data-driven-forms/common/multiple-choice-list';
import { Checkbox, FormGroup, Intent } from '@blueprintjs/core';

import FormGroupWrapper from '../form-group/form-group';
import propsCatcher from '../props-catcher/props-catcher';
import BlueprintContext from '../blueprint-context/blueprint-context';

const SingleCheckbox = ({ input, isDisabled, disabled, label, providerRequired, ...props }) => (
  <Checkbox
    label={label}
    {...propsCatcher(props)}
    {...(props.isRequired && {
      label: (
        <span>
          {label} {providerRequired}
        </span>
      ),
    })}
    disabled={disabled || isDisabled}
    {...input}
  />
);

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

const WrapperCheckbox = (props) =>
  props.options ? (
    <MultipleChoiceList {...props} Wrapper={Wrapper} Checkbox={SingleCheckbox} />
  ) : (
    <FormGroupWrapper {...props} hideLabel Component={SingleCheckbox} />
  );

export default WrapperCheckbox;
