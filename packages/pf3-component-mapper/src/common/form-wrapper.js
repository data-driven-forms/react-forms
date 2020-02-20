import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup as Pf3FormGroup, ControlLabel } from 'patternfly-react/dist/js/components/Form';
import { FieldLevelHelp } from 'patternfly-react/dist/js/components/FieldLevelHelp';
import { validationError } from '../form-fields/helpers';
import RequiredLabel from '../form-fields/required-label';
import renderHelperText from './render-helper-text';

const FormGroup = ({ meta, validateOnMount, label, hideLabel, noCheckboxLabel, isRequired, helperText, description, children }) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <Pf3FormGroup validationState={invalid ? 'error' : null}>
      {label && !hideLabel && !noCheckboxLabel && (
        <ControlLabel>
          {isRequired ? <RequiredLabel label={label} /> : label}
          {helperText && <FieldLevelHelp content={helperText} />}
        </ControlLabel>
      )}
      {children}
      {renderHelperText(invalid && meta.error, description)}
    </Pf3FormGroup>
  );
};

FormGroup.propTypes = {
  meta: PropTypes.shape({ error: PropTypes.string }).isRequired,
  validateOnMount: PropTypes.bool,
  hideLabel: PropTypes.bool,
  label: PropTypes.string,
  noCheckboxLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
};

export default FormGroup;
