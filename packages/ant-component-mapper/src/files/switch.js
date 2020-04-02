import React from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch } from 'antd';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import AntForm from '../common/form-wrapper';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const Switch = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta, onText, offText, ...rest } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;
  const { name, value, onChange, onBlur } = input;
  return (
    <AntForm help={text} invalid={invalid} isRequired={isRequired} error={!!invalid} label={input.checked ? onText || label : offText || label}>
      <AntSwitch
        {...rest}
        defaultValue={input.value ? input.value : undefined}
        onChange={onChange}
        value={value}
        name={name}
        onClick={onBlur}
        disabled={isDisabled || isReadOnly}
      />
    </AntForm>
  );
};

Switch.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  onText: PropTypes.node,
  offText: PropTypes.node,
  description: PropTypes.node
};

export default Switch;
