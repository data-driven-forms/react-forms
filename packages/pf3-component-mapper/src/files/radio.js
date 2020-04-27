import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../common/form-wrapper';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Radio as Pf3Radio } from 'patternfly-react';

const RadioOption = ({ name, option, isDisabled, isReadOnly }) => {
  const { input } = useFieldApi({ name, type: 'radio', value: option.value });
  return (
    <Pf3Radio key={`${name}-${option.value}`} {...input} onChange={() => input.onChange(option.value)} disabled={isDisabled || isReadOnly}>
      {option.label}
    </Pf3Radio>
  );
};

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.node.isRequired, value: PropTypes.any.isRequired }).isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool
};

const Radio = ({ name, isRequired, isDisabled, isReadOnly, validateOnMount, helperText, label, description, hideLabel, options, inputAddon }) => {
  const { meta } = useFieldApi({ name, type: 'radio' });
  return (
    <FormGroup
      meta={meta}
      validateOnMount={validateOnMount}
      label={label}
      hideLabel={hideLabel}
      isRequired={isRequired}
      helperText={helperText}
      description={description}
      inputAddon={inputAddon}
    >
      {options.map((option) => (
        <RadioOption key={option.value} name={name} option={option} isReadOnly={isReadOnly} isDisabled={isDisabled} />
      ))}
    </FormGroup>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
  label: PropTypes.node,
  hideLabel: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.any })),
  inputAddon: PropTypes.shape({ fields: PropTypes.array })
};

export default Radio;
