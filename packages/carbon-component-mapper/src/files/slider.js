import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Slider as CarbonSlider } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';

const Slider = (props) => {
  const { input, meta, isRequired, ...rest } = useFieldApi(prepareProps(props));

  const invalid = meta.touched && meta.error;

  return (
    <CarbonSlider
      {...input}
      value={Number(input.value) || 0}
      key={input.name}
      id={input.name}
      invalid={Boolean(invalid)}
      min={0}
      max={100}
      required={isRequired}
      {...rest}
    />
  );
};

Slider.propTypes = {
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node
};

export default Slider;
