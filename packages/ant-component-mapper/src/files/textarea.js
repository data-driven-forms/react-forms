import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import AntForm from '../common/form-wrapper';

const { TextArea } = Input;

const Textarea = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    FormItemProps,
    ...rest
  } = useFieldApi(props);

  return (
    <AntForm
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
    >
      <TextArea
        {...input}
        defaultValue={input.value ? input.value : undefined}
        disabled={isDisabled}
        readOnly={isReadOnly}
        placeholder={placeholder}
        {...rest}
      />
    </AntForm>
  );
};

Textarea.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node,
  FormItemProps: PropTypes.object
};

export default Textarea;
