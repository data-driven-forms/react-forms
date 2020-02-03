import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup } from '@patternfly/react-core/dist/js/components/Form/FormGroup';
import { Checkbox } from '@patternfly/react-core/dist/js/components/Checkbox/Checkbox';

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
