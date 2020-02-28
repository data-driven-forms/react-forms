import React from 'react';
import PropTypes from 'prop-types';
import SwitchField from '../form-fields/switch-field';

import FormGroup from '../common/form-wrapper';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const Switch = (props) => {
  const {
    meta,
    validateOnMount,
    label,
    hideLabel,
    isRequired,
    helperText,
    description,
    input,
    placeholder,
    isDisabled,
    inputAddon,
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  return (
    <FormGroup
      meta={meta}
      validateOnMount={validateOnMount}
      label={label}
      hideLabel={hideLabel}
      isRequired={isRequired}
      helperText={helperText}
      description={description}
      inputAddon={inputAddon}
    >
      <SwitchField
        {...rest}
        {...input}
        disabled={isDisabled}
        checked={input.checked}
        onChange={({ target: { checked } }) => input.onChange(checked)}
      />
    </FormGroup>
  );
};

Switch.propTypes = {
  meta: PropTypes.object,
  validateOnMount: PropTypes.bool,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  inputAddon: PropTypes.shape({ fields: PropTypes.array })
};

export default Switch;
