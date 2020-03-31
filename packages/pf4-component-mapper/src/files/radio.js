import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Radio as Pf4Radio } from '@patternfly/react-core';
import FormGroup from '../common/form-group';

const RadioOption = ({ name, option, isDisabled, isReadOnly, radioGroupValue }) => {
  const {
    input: { checked, ...input }
  } = useFieldApi({ name, value: option.value });
  return (
    <Pf4Radio
      key={`${name}-${option.value}`}
      {...input}
      isChecked={radioGroupValue === option.value}
      value={option.value}
      onChange={() => input.onChange(option.value)}
      label={option.label}
      id={`${name}-${option.value}`}
      aria-label={option.label}
      isDisabled={isDisabled || isReadOnly}
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
  const { label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id } = useFieldApi({
    name,
    ...props
  });
  return (
    <FormGroup
      label={label}
      isRequired={isRequired}
      helperText={helperText}
      meta={meta}
      description={description}
      hideLabel={hideLabel}
      id={id || input.name}
    >
      {options.map((option) => (
        <RadioOption radioGroupValue={input.value} key={option.value} name={name} option={option} isReadOnly={isReadOnly} isDisabled={isDisabled} />
      ))}
    </FormGroup>
  );
};

Radio.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  hideLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })).isRequired,
  type: PropTypes.any
};

export default Radio;
