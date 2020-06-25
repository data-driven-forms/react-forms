import React from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch } from 'antd';
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
    <AntForm help={text} invalid={invalid} isRequired={isRequired} error={!!invalid} label={label}>
      <AntSwitch
        {...rest}
        defaultValue={input.value ? input.value : undefined}
        onChange={onChange}
        value={value}
        name={name}
        onClick={onBlur}
        checkedChildren={onText}
        unCheckedChildren={offText}
        disabled={isDisabled || isReadOnly}
      />
    </AntForm>
  );
};

Switch.propTypes = {
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
