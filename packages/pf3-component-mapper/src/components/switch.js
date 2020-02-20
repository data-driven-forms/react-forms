import React from 'react';
import PropTypes from 'prop-types';
import SwitchField from '../form-fields/switch-field';

import FormGroup from '../common/form-wrapper';

const SwitchGroup = ({ meta, validateOnMount, label, hideLabel, isRequired, helperText, description, input, placeholder, isDisabled, ...props }) => (
  <FormGroup
    meta={meta}
    validateOnMount={validateOnMount}
    label={label}
    hideLabel={hideLabel}
    isRequired={isRequired}
    helperText={helperText}
    description={description}
  >
    <SwitchField {...props} {...input} disabled={isDisabled} checked={input.value} onChange={({ target: { checked }}) => input.onChange(checked)} />
  </FormGroup>
);

SwitchGroup.propTypes = {
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
  isDisabled: PropTypes.bool
};

const Switch = ({ FieldProvider, ...props }) => <FieldProvider {...props} component={SwitchGroup} />;

Switch.propTypes = {
  FieldProvider: PropTypes.any.isRequired // will not be part of props
};

export default Switch;
