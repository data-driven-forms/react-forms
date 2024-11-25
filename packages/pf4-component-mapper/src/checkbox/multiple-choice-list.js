import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@patternfly/react-core';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';
import FormGroup from '../form-group/form-group';

const FinalCheckbox = ({ option, ...props }) => (
  <Checkbox isChecked={props.checked} {...props} onChange={(e, _value) => props.onChange(e)} {...option} />
);

FinalCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.object,
};

const Wrapper = ({ meta, children, ...rest }) => (
  <FormGroup {...rest} id={rest.name || rest.id} meta={meta}>
    {children}
  </FormGroup>
);

Wrapper.propTypes = {
  ...wrapperProps,
};

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

export default MultipleChoiceList;
