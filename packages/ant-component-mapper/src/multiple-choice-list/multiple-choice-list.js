import React from 'react';

import { Checkbox as AntCheckbox } from 'antd';
import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';
import FormGroup from '../form-group';

const FinalCheckbox = ({ isDisabled, label, ...props }) => (
  <AntCheckbox {...props} disabled={isDisabled}>
    {label}
  </AntCheckbox>
);

const Wrapper = ({ label, isRequired, children, meta, input, validateOnMount, helperText, description, FormItemProps }) => (
  <FormGroup
    label={label}
    meta={meta}
    validateOnMount={validateOnMount}
    helperText={helperText}
    description={description}
    FormItemProps={FormItemProps}
    isRequired={isRequired}
    input={input}
  >
    {children}
  </FormGroup>
);

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

export default MultipleChoiceList;
