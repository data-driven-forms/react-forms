import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'antd';
import { validationError } from '../common/helpers';
import { childrenPropTypes } from '@data-driven-forms/common/prop-types-templates';

const FormGroup = ({ label, children, isRequired, FormItemProps, meta, validateOnMount, helperText, description, hideLabel }) => {
  const invalid = validationError(meta, validateOnMount);
  const warning = (meta.touched || validateOnMount) && meta.warning;
  const help = invalid || warning || helperText || description;

  return (
    <Form.Item
      validateStatus={!invalid ? (warning ? 'warning' : '') : 'error'}
      help={help}
      label={!hideLabel && label}
      required={isRequired}
      {...FormItemProps}
    >
      {children}
    </Form.Item>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string,
  children: childrenPropTypes,
  help: PropTypes.string,
  isRequired: PropTypes.bool,
  invalid: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  FormItemProps: PropTypes.object,
  meta: PropTypes.object,
  validateOnMount: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool
};

export default FormGroup;
