import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../common/form-group';
import RadioGroup from '../common/radio';

const Radio = ({
  label,
  isRequired,
  helperText,
  meta,
  description,
  hideLabel,
  input,
  isReadOnly,
  isDisabled,
  id,
  options,
  FieldProvider,
  ...rest
}) => (
  <FormGroup
    label={label}
    isRequired={isRequired}
    helperText={helperText}
    meta={meta}
    description={description}
    hideLabel={hideLabel}
    id={id || input.name}
  >
    <RadioGroup options={options} FieldProvider={FieldProvider} isDisabled={isDisabled} isReadOnly={isReadOnly} input={input} {...rest} />
  </FormGroup>
);

Radio.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  meta: PropTypes.object.isRequired,
  description: PropTypes.string,
  hideLabel: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })).isRequired,
  FieldProvider: PropTypes.any // will not be in props
};

export default Radio;
