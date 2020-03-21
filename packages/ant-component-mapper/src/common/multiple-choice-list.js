import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox as AntCheckbox } from 'antd';
import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import { validationError } from './helpers';
import AntForm from './form-wrapper';

const FinalCheckbox = ({ isDisabled, label, ...props }) => (
  <AntCheckbox {...props} disabled={isDisabled}>
    {label}
  </AntCheckbox>
);

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node
};

const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText, description }) => {
  const invalid = validationError(meta, validateOnMount);
  const help = helperText || description || invalid;
  return (
    <AntForm label={label} help={help} invalid={invalid} component="fieldset" isRequired={isRequired} layout="vertical">
      {children}
    </AntForm>
  );
};

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
