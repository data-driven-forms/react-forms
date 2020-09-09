import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Slider as CarbonSlider } from 'carbon-components-react';

import WithDescription from '../common/with-description';

const Slider = (props) => {
  const { input, meta, isDisabled, label, labelText, isRequired, optionalText, description, ...rest } = useFieldApi(props);

  const modifiedLabel = description ? <WithDescription description={description} labelText={labelText || label} /> : labelText || label;

  const invalid = meta.touched && meta.error;

  return (
    <CarbonSlider
      {...input}
      value={Number(input.value) || 0}
      key={input.name}
      id={input.name}
      labelText={modifiedLabel}
      disabled={isDisabled}
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
