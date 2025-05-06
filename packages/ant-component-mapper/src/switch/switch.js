import React from 'react';
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
    type: 'checkbox',
  });
  const { name, checked, onChange, onBlur } = input;

  return (
    <FormGroup
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
      input={input}
    >
      <AntSwitch
        id={input.name}
        {...rest}
        defaultValue={input.checked ? input.checked : undefined}
        onChange={onChange}
        checked={checked}
        name={name}
        onClick={onBlur}
        checkedChildren={onText}
        unCheckedChildren={offText}
        disabled={isDisabled || isReadOnly}
      />
    </FormGroup>
  );
};

export default Switch;
