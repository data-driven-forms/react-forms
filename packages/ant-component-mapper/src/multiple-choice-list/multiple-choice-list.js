import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox as AntCheckbox } from 'antd';
import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';
import FormGroup from '../form-group';

const FinalCheckbox = ({ isDisabled, label, ...props }) => (
  <AntCheckbox {...props} disabled={isDisabled}>
    {label}
  </AntCheckbox>
);

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node
};

const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText, description, FormItemProps }) => (
  <FormGroup
    label={label}
    meta={meta}
    validateOnMount={validateOnMount}
    helperText={helperText}
    description={description}
    FormItemProps={FormItemProps}
    isRequired={isRequired}
  >
    {children}
  </FormGroup>
);

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = (props) => <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />;

MultipleChoiceList.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

export default MultipleChoiceList;
