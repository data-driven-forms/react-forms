import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox as AntCheckbox } from 'antd';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import MultipleChoiceList from '../common/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { validationError } from '../common/helpers';

export const SingleCheckbox = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;
  return (
    <Form component="fieldset">
      <Form.Item
        validateStatus={!invalid ? '' : 'error'}
        rules={[
          {
            required: isRequired,
            message: 'Required'
          }
        ]} //this is useless
        help={text}
      >
        <AntCheckbox checked={input.checked} {...input} disabled={isDisabled || isReadOnly} value={input.name}>
          {label}
        </AntCheckbox>
      </Form.Item>
    </Form>
  );
};

SingleCheckbox.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  description: PropTypes.node,
  validateOnMount: PropTypes.bool
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.array
};

export default Checkbox;
