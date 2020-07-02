import React from 'react';
import PropTypes from 'prop-types';
import { Radio as AntRadio } from 'antd';
import { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import AntForm from '../common/form-wrapper';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const RadioOption = ({ name, option }) => {
  const { input } = useFieldApi({ name, type: 'radio', value: option.value });
  return (
    <AntRadio key={`${name}-${option.value}`} {...input} id={`${name}-${option.value}`}>
      {option.label}
    </AntRadio>
  );
};

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.any.isRequired }).isRequired
};

const Radio = ({ name, ...props }) => {
  const { options, isDisabled, label, isRequired, helperText, description, isReadOnly, meta, validateOnMount } = useFieldApi({
    ...props,
    name,
    type: 'radio'
  });
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;
  return (
    <AntForm layout="vertical" isRequired={isRequired} label={label} invalid={invalid} help={text}>
      <AntRadio.Group name={name} disabled={isDisabled || isReadOnly}>
        {options.map((option) => (
          <RadioOption key={option.value} name={name} option={option} />
        ))}
      </AntRadio.Group>
    </AntForm>
  );
};

Radio.propTypes = {
  ...wrapperProps,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node
    })
  ),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  children: PropTypes.any,
  description: PropTypes.node
};

Radio.defaultProps = {
  options: []
};

export default Radio;
