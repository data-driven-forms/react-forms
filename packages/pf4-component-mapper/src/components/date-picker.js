import React from 'react';
import FormGroup from '../common/form-group';
import { TextInput } from '@patternfly/react-core/dist/js/components/TextInput/TextInput';
import PropTypes from 'prop-types';

const DatePicker = ({ label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, ...rest }) => {
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
    >
      <TextInput {...input} {...rest} type="date" id={id || input.name} isReadOnly={isReadOnly} isDisabled={isDisabled} />
    </FormGroup>
  );
};

DatePicker.propTypes = {
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

export default DatePicker;
