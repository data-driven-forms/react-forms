import React from 'react';
import { Radio as AntRadio } from 'antd';
import FormGroup from '../form-group';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const RadioOption = ({ name, option: { label, value, ...rest } }) => (
  <AntRadio key={`${name}-${value}`} id={`${name}-${value}`} value={value} {...rest}>
    {label}
  </AntRadio>
);

const Radio = ({ name, component, ...props }) => {
  const {
    options = [],
    isDisabled,
    label,
    isRequired,
    helperText,
    description,
    isReadOnly,
    meta,
    validateOnMount,
    FormItemProps,
    input,
    ...rest
  } = useFieldApi({
    ...props,
    name,
  });

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
      <AntRadio.Group name={name} disabled={isDisabled || isReadOnly} {...input} {...rest}>
        {options.map((option) => (
          <RadioOption key={option.value} name={name} option={option} />
        ))}
      </AntRadio.Group>
    </FormGroup>
  );
};

export default Radio;
