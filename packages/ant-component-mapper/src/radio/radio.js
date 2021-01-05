import React from 'react';
import PropTypes from 'prop-types';
import { Radio as AntRadio } from 'antd';
import { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';
import FormGroup from '../form-group';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const RadioOption = ({ name, option, ...rest }) => {
  const { input } = useFieldApi({ name, type: 'radio', value: option.value });
  return (
    <AntRadio key={`${name}-${option.value}`} {...input} id={`${name}-${option.value}`} {...rest}>
      {option.label}
    </AntRadio>
  );
};

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.any.isRequired }).isRequired
};

const Radio = ({ name, ...props }) => {
  const { options, isDisabled, label, isRequired, helperText, description, isReadOnly, meta, validateOnMount, FormItemProps, ...rest } = useFieldApi({
    ...props,
    name,
    type: 'radio'
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
      <AntRadio.Group name={name} disabled={isDisabled || isReadOnly} {...rest}>
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
      label: PropTypes.node
    })
  ),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  description: PropTypes.node,
  FormItemProps: PropTypes.object
};

Radio.defaultProps = {
  options: []
};

export default Radio;
