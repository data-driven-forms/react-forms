import React from 'react';

import { Checkbox } from '@patternfly/react-core';

import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';
import FormGroup from '../form-group/form-group';

const FinalCheckbox = ({ option, ...props }) => (
  <Checkbox isChecked={props.checked} {...props} onChange={(e, _value) => props.onChange(e)} {...option} />
);

const Wrapper = ({ meta, children, ...rest }) => (
  <FormGroup {...rest} id={rest.name || rest.id} meta={meta}>
    {children}
  </FormGroup>
);

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

export default MultipleChoiceList;
