import React from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch } from 'antd';
import FormGroup from '../form-group';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const Switch = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    onText,
    offText,
    FormItemProps,
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const { name, value, onChange, onBlur } = input;

  return (
    <FormGroup
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
    >
      <AntSwitch
        {...rest}
        defaultValue={input.value ? input.value : undefined}
        onChange={onChange}
        checked={value}
        name={name}
        onClick={onBlur}
        checkedChildren={onText}
        unCheckedChildren={offText}
        disabled={isDisabled || isReadOnly}
      />
    </FormGroup>
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
  description: PropTypes.node,
  FormItemProps: PropTypes.object
};

export default Switch;
