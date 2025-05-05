import React from 'react';

import { Form } from 'antd';
import { validationError } from '../validation-error/';

const FormGroup = ({ label, children, isRequired, FormItemProps, meta, validateOnMount, helperText, description, hideLabel, input }) => {
  const invalid = validationError(meta, validateOnMount);
  const warning = (meta.touched || validateOnMount) && meta.warning;
  const help = invalid || warning || helperText || description;

  return (
    <Form.Item
      validateStatus={!invalid ? (warning ? 'warning' : '') : 'error'}
      help={help}
      label={!hideLabel && label}
      required={isRequired}
      htmlFor={input?.name}
      {...FormItemProps}
    >
      {children}
    </Form.Item>
  );
};

export default FormGroup;
