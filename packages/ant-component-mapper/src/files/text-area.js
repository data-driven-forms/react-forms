import React from 'react';
import PropTypes from 'prop-types';
import { Input /* Typography */ } from 'antd';

import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates'; //only for propTypes check
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import AntForm from '../common/form-wrapper';

const TextField = (props) => {
  const { input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, description, validateOnMount, meta, ...rest } = useFieldApi(
    props
  );
  const invalid = validationError(meta, validateOnMount);
  const help = invalid || helperText || description;
  return (
    <AntForm
      layout="vertical"
      invalid={invalid}
      isRequired={isRequired}
      validateStatus={!invalid ? '' : 'error'}
      help={help}
      label={label}
      name={label}
    >
      <Input.TextArea {...input} disabled={isDisabled} readOnly={isReadOnly} placeholder={placeholder} {...rest} />
    </AntForm>
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
