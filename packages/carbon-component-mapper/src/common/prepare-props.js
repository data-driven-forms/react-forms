import React from 'react';
import WithDescription from './with-description';

const prepareProps = ({ isDisabled, isReadOnly, label, description, ...props }) => ({
  disabled: isDisabled,
  labelText: label,
  readOnly: isReadOnly,
  ...props,
  ...(description ? { labelText: <WithDescription description={description} labelText={label || props.labelText} /> } : {})
});

export default prepareProps;
