import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input /* Typography */ } from 'antd';

// import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates'; //only for propTypes check
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const TextField = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, description, validateOnMount, meta, ...rest } = useFieldApi(
    props
  );
  console.log(useFieldApi(props));
  // const invalid = validationError(meta, validateOnMount);
  return (
    <Form layout="vertical">
      <Form.Item
        help={helperText || description}
        label={label}
        name={label}
        validateTrigger="onSubmit"
        rules={[
          {
            required: isRequired,
            message: 'Required'
          }
        ]}
      >
        <Input disabled={isDisabled} readOnly={isReadOnly} placeholder={placeholder} {...rest} />
      </Form.Item>
    </Form>
  );
};

TextField.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node
};

export default TextField;
