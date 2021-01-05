import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup, ControlLabel, FieldLevelHelp } from 'patternfly-react';
import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';

import RequiredLabel from './required-label';
import renderHelperText from '../common/render-helper-text';

const FinalCheckbox = ({ label, isDisabled, ...props }) => (
  <Checkbox {...props} disabled={isDisabled}>
    {label}
  </Checkbox>
);

FinalCheckbox.propTypes = {
  label: PropTypes.node,
  isDisabled: PropTypes.bool
};

const Wrapper = ({ showError, isRequired, helperText, label, meta, description, children }) => (
  <FormGroup validationState={showError ? 'error' : null}>
    <ControlLabel>
      {isRequired ? <RequiredLabel label={label} /> : label}
      {helperText && <FieldLevelHelp content={helperText} />}
    </ControlLabel>
    <div>{children}</div>
    {renderHelperText(showError && meta.error, description)}
  </FormGroup>
);

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

export default MultipleChoiceList;
