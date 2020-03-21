import React from 'react';
import PropTypes from 'prop-types';

import { Form, Checkbox as AntCheckbox } from 'antd';
import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import { validationError } from './helpers';

const FinalCheckbox = ({ isDisabled, label, ...props }) => (
  <AntCheckbox {...props} disabled={isDisabled}>
    {label}
  </AntCheckbox>
);

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node
};

//not sure if it is necessary to make sure that the checkoboxes are aligned vertiacally when multiple
const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText, description }) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <Form required={isRequired} layout="vertical" component="fieldset">
      <Form.Item
        label={label}
        name={label}
        help={helperText || description || invalid}
        validateStatus={!invalid ? '' : 'error'}
        rules={[
          {
            required: isRequired,
            message: 'Required'
          }
        ]}
      >
        {children}
      </Form.Item>
    </Form>
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
