import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Radio as Pf4Radio } from '@patternfly/react-core';
import FormGroup from '../form-group/form-group';

const RadioOption = ({ name, option: { value, label, ...restOption }, isDisabled, isReadOnly }) => {
  const { input } = useFieldApi({ name, value });
  return (
    <Pf4Radio
      key={`${name}-${value}`}
      {...input}
      isChecked={input.value === value}
      value={value}
      onChange={() => input.onChange(value)}
      label={label}
      id={`${name}-${value}`}
      aria-label={label}
      isDisabled={isDisabled || isReadOnly}
      {...restOption}
    />
  );
};

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.node.isRequired, value: PropTypes.any.isRequired }).isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  radioGroupValue: PropTypes.any
};

const Radio = ({ name, options, type, ...props }) => {
  /**
   * You cannot assign type radio to PF4 radio buttons input. It will break and will not set input value, only checked property
   * It has to be reqular input and we have change the radio value manully to the option value
   */
  const {
    label,
    isRequired,
    helperText,
    meta,
    validateOnMount,
    description,
    hideLabel,
    input,
    isReadOnly,
    isDisabled,
    id,
    FormGroupProps
  } = useFieldApi({
    name,
    ...props
  });
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      validateOnMount={validateOnMount}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
      FormGroupProps={FormGroupProps}
    >
      {options.map((option) => (
        <RadioOption key={option.value} name={name} option={option} isReadOnly={isReadOnly} isDisabled={isDisabled} />
      ))}
    </FormGroup>
  );
};

Radio.propTypes = {
  label: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.any })).isRequired,
  type: PropTypes.any,
  FormGroupProps: PropTypes.object
};

export default Radio;
