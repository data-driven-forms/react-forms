import React from 'react';
import PropTypes from 'prop-types';
import { Switch as Pf4Switch } from '@patternfly/react-core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group/form-group';
import IsRequired from '../is-required/is-required';

const Switch = (props) => {
  const {
    label,
    offText,
    onText,
    isRequired,
    helperText,
    meta,
    validateOnMount,
    description,
    input,
    isReadOnly,
    isDisabled,
    id,
    FormGroupProps,
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  return (
    <FormGroup
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      <Pf4Switch
        {...rest}
        {...input}
        id={id || input.name}
        isDisabled={isDisabled || isReadOnly}
        label={isRequired ? <IsRequired>{onText || label}</IsRequired> : onText || label}
        labelOff={isRequired ? <IsRequired>{offText || label}</IsRequired> : offText || label}
      />
    </FormGroup>
  );
};

Switch.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  onText: PropTypes.node,
  offText: PropTypes.node,
  FormGroupProps: PropTypes.object
};

export default Switch;
