import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../common/form-wrapper';
import { useFieldProviderApi } from '@data-driven-forms/react-form-renderer';
import { Radio as Pf3Radio } from 'patternfly-react';

const Radio = ({ name, isRequired, isDisabled, isReadOnly, validateOnMount, helperText, label, description, hideLabel, options, ...props }) => {
  const { meta } = useFieldProviderApi({ name, type: 'radio' });
  return (
    <FormGroup
      meta={meta}
      validateOnMount={validateOnMount}
      label={label}
      hideLabel={hideLabel}
      isRequired={isRequired}
      helperText={helperText}
      description={description}
    >
      {options.map((option) => {
        const { input } = useFieldProviderApi({ name, type: 'radio', value: option.value });
        return (
          <Pf3Radio
            key={`${name}-${option.value}`}
            {...input}
            onChange={() => {
              input.onChange(option.value);
            }}
            disabled={isDisabled || isReadOnly}
          >
            {option.label}
          </Pf3Radio>
        );
      })}
    </FormGroup>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  validateOnMount: PropTypes.bool,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any }))
};

export default Radio;
