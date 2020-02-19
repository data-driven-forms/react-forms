import React from 'react';
import { TextArea as Pf4TextArea } from '@patternfly/react-core/dist/js/components/TextArea/TextArea';
import PropTypes from 'prop-types';
import FormGroup from '../common/form-group';

const TextArea = ({ label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, ...rest }) => (
  <FormGroup
    label={label}
    isRequired={isRequired}
    helperText={helperText}
    meta={meta}
    description={description}
    hideLabel={hideLabel}
    id={id || input.name}
  >
    <Pf4TextArea disabled={isDisabled || isReadOnly} {...input} {...rest} />
  </FormGroup>
);

TextArea.propTypes = {
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

export default TextArea;
