import React from 'react';
import PropTypes from 'prop-types';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Slider as PF3Slider } from 'patternfly-react';

import FormGroup from '../common/form-wrapper';

const Slider = (props) => {
  const {
    meta,
    input,
    sliderInput,
    validateOnMount,
    label,
    sliderLabel,
    hideLabel,
    isRequired,
    helperText,
    description,
    inputAddon,
    ...rest
  } = useFieldApi(props);

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
      <PF3Slider {...input} label={sliderLabel} input={sliderInput} {...rest} value={input.value || rest.min} onSlide={input.onChange} />
    </FormGroup>
  );
};

Slider.propTypes = {
  validateOnMount: PropTypes.bool,
  label: PropTypes.node,
  hideLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  placeholder: PropTypes.string,
  inputAddon: PropTypes.shape({ fields: PropTypes.array }),
  sliderLabel: PropTypes.node,
  sliderInput: PropTypes.bool
};

export default Slider;
