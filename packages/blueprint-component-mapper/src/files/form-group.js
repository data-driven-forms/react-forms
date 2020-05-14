import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormGroup, Intent } from '@blueprintjs/core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import BlueprintContext from './blueprint-context';

const FormGroupWrapper = (props) => {
  const {
    meta,
    isDisabled,
    isReadOnly,
    isRequired,
    Component,
    helperText,
    label,
    input,
    validateOnMount,
    description,
    FormGroupProps,
    hideLabel,
    ...rest
  } = useFieldApi(props);
  const { required } = useContext(BlueprintContext);

  const { error, touched } = meta;
  const showError = (validateOnMount || touched) && error;

  const text = showError ? error : helperText || description;

  const intent = showError && error && { intent: Intent.DANGER };
  const labelInfo = !hideLabel && isRequired && { labelInfo: required };

  return (
    <FormGroup helperText={text} label={!hideLabel && label} labelFor={input.name} {...labelInfo} {...FormGroupProps} {...intent}>
      <Component
        providerRequired={required}
        disabled={isDisabled || isReadOnly}
        {...rest}
        label={label}
        isRequired={isRequired}
        input={input}
        {...intent}
      />
    </FormGroup>
  );
};

FormGroupWrapper.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  Component: PropTypes.any,
  helperText: PropTypes.node,
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node,
  FormGroupProps: PropTypes.object,
  hideLabel: PropTypes.bool
};

export default FormGroupWrapper;
