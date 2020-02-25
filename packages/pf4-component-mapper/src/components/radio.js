import React from 'react';
import PropTypes from 'prop-types';
import { useFieldProviderApi } from '@data-driven-forms/react-form-renderer';
import { Radio as Pf4Radio } from '@patternfly/react-core/dist/js/components/Radio';
import FormGroup from '../common/form-group';

const Radio = ({ name, options, ...props }) => {
  const { label, isRequired, helperText, meta, description, hideLabel, input, isReadOnly, isDisabled, id, ...rest } = useFieldProviderApi({
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
      {options.map((option) => {
        const { input } = useFieldProviderApi({ name, type: 'radio', value: option.value });
        return (
          <Pf4Radio
            key={`${name}-${option.value}`}
            {...input}
            label={option.label}
            id={`${name}-${option.value}`}
            aria-label={option.label}
            isDisabled={isDisabled || isReadOnly}
          />
        );
      })}
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
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })).isRequired
};

export default Radio;
