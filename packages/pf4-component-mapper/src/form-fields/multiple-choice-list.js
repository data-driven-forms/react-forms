import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup } from '@patternfly/react-core';
import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';

const FinalCheckbox = (props) => (
  <Checkbox isChecked={ props.checked } { ...props }/>
);

FinalCheckbox.propTypes = {
  checked: PropTypes.bool,
};

const Wrapper = ({ showError, isRequired, helperText, label, meta, children, rest }) =>(
  <FormGroup
    label={ label }
    fieldId={ rest.id || rest.key || rest.name }
    isValid={ !showError }
    isRequired={ isRequired }
    helperText={ helperText }
    helperTextInvalid={ meta.error }
  >
    { children }
  </FormGroup>
);

Wrapper.propTypes = {
  ...wrapperProps,
};

const MultipleChoiceList = (props) => (
  <MultipleChoiceListCommon
    { ...props }
    Wrapper={ Wrapper }
    Checkbox={ FinalCheckbox }
  />
);

export default MultipleChoiceList;
