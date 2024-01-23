import React from 'react';
import PropTypes from 'prop-types';
import { Radio as AntRadio } from 'antd';
import { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';
import FormGroup from '../form-group';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const RadioOption = ({ name, option: { label, value, ...rest } }) => (
  <AntRadio key={`${name}-${value}`} id={`${name}-${value}`} value={value} {...rest}>
    {label}
  </AntRadio>
);

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.any.isRequired }).isRequired,
};

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

Radio.propTypes = {
  ...wrapperProps,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node,
    })
  ),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  description: PropTypes.node,
  FormItemProps: PropTypes.object,
  component: PropTypes.string,
};

export default Radio;
