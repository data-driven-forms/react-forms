import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@patternfly/react-core/dist/js/components/Checkbox/Checkbox';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import FormGroup from './form-group';

const FinalCheckbox = (props) => <Checkbox isChecked={props.checked} {...props} />;

FinalCheckbox.propTypes = {
  checked: PropTypes.bool
};

const Wrapper = ({ isRequired, helperText, label, meta, children, ...rest }) => (
  <FormGroup label={label} meta={meta} id={rest.name} isRequired={isRequired} helperText={helperText}>
    {children}
  </FormGroup>
);

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} name={props.input.name} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

MultipleChoiceList.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default MultipleChoiceList;
