import React from 'react';
import WithDescription from '../with-description';
import IsRequired from '../is-required/is-required';

export const buildLabel = (label, isRequired) => (label && (isRequired ? <IsRequired>{label}</IsRequired> : label)) || undefined;

const prepareProps = ({ isDisabled, isReadOnly, isRequired = false, label, description, ...props }) => ({
  disabled: isDisabled,
  labelText: buildLabel(label, isRequired),
  readOnly: isReadOnly,
  ...props,
  ...(description ? { labelText: <WithDescription description={description} labelText={buildLabel(label || props.labelText, isRequired)} /> } : {})
});

export default prepareProps;
