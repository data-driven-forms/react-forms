import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../common/form-wrapper';
import RadioGroup from '../form-fields/radio-group';

const Radio = ({
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
  isReadOnly,
  options,
  FieldProvider,
  ...props
}) => (
  <FormGroup
    meta={meta}
    validateOnMount={validateOnMount}
    label={label}
    hideLabel={hideLabel}
    isRequired={isRequired}
    helperText={helperText}
    description={description}
  >
    <RadioGroup options={options} FieldProvider={FieldProvider} isDisabled={isDisabled} isReadOnly={isReadOnly} input={input} />
  </FormGroup>
);

Radio.propTypes = {
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
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  FieldProvider: PropTypes.any.isRequired // will be removed form props
};

export default Radio;
