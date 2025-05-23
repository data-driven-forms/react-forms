import React, { useContext } from 'react';

import { FormGroup, Intent } from '@blueprintjs/core';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import BlueprintContext from '../blueprint-context/blueprint-context';

export const FormGroupInternal = ({
  meta,
  validateOnMount,
  helperText,
  description,
  hideLabel,
  isReadOnly,
  label,
  input,
  isDisabled,
  isRequired,
  FormGroupProps,
  Component,
  ...rest
}) => {
  const { required } = useContext(BlueprintContext);

  const { error, touched, warning, submitError } = meta;
  const showError = (validateOnMount || touched) && (error || submitError);
  const showWarning = (validateOnMount || touched) && warning;

  const text = showError || showWarning || helperText || description;

  const intent = (showError && { intent: Intent.DANGER }) || (showWarning && { intent: Intent.WARNING });
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

const FormGroupWrapper = (props) => {
  const rest = useFieldApi(props);

  return <FormGroupInternal {...rest} />;
};

export default FormGroupWrapper;
