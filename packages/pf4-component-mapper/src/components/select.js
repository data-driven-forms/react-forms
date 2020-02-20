import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../common/form-group';
import DataDrivenSelect from './select/select';

const Select = ({ label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, ...rest }) => (
  <FormGroup
    label={label}
    isRequired={isRequired}
    helperText={helperText}
    meta={meta}
    description={description}
    hideLabel={hideLabel}
    id={id || input.name}
  >
    <DataDrivenSelect {...input} {...rest} isDisabled={isDisabled || isReadOnly} />
  </FormGroup>
);

Select.propTypes = {
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
  id: PropTypes.string
};

export default Select;
