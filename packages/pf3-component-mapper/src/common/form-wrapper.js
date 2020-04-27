import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FieldLevelHelp } from 'patternfly-react';
import { validationError } from '../form-fields/helpers';
import RequiredLabel from '../form-fields/required-label';
import renderHelperText from './render-helper-text';
import InputAddonWrapper from './render-input-group';

const Pf3FormGroup = ({ meta, validateOnMount, label, hideLabel, noCheckboxLabel, isRequired, helperText, description, children, inputAddon }) => {
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormGroup validationState={invalid ? 'error' : null}>
      {label && !hideLabel && !noCheckboxLabel && (
        <ControlLabel>
          {isRequired ? <RequiredLabel label={label} /> : label}
          {helperText && <FieldLevelHelp content={helperText} />}
        </ControlLabel>
      )}
      {inputAddon ? <InputAddonWrapper inputAddon={inputAddon}>{children}</InputAddonWrapper> : children}
      {renderHelperText(invalid && meta.error, description)}
    </FormGroup>
  );
};

Pf3FormGroup.propTypes = {
  meta: PropTypes.shape({ error: PropTypes.string }).isRequired,
  validateOnMount: PropTypes.bool,
  hideLabel: PropTypes.bool,
  label: PropTypes.node,
  noCheckboxLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  inputAddon: PropTypes.shape({ fields: PropTypes.array })
};

export default Pf3FormGroup;
