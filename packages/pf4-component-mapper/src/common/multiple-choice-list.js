import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@patternfly/react-core/dist/js/components/Checkbox/Checkbox';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import FormGroup from './form-group';

const FinalCheckbox = (props) => <Checkbox isChecked={props.checked} {...props} onChange={(_value, e) => props.onChange(e)} />;

FinalCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

const Wrapper = ({ meta, children, ...rest }) => (
  <FormGroup {...rest} id={rest.name || rest.id} meta={meta}>
    {children}
  </FormGroup>
);

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

export default MultipleChoiceList;
