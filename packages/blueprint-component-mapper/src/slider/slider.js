import React from 'react';
import PropTypes from 'prop-types';

import FormGroupWrapper from '../form-group/form-group';

import { Slider as BSlider } from '@blueprintjs/core';
import propsCatcher from '../props-catcher/props-catcher';

const Slider = ({ input, step, ...props }) => <BSlider stepSize={step} {...propsCatcher(props)} {...input} value={input.value || 0} />;

Slider.propTypes = {
  input: PropTypes.object,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const WrapperSlider = (props) => <FormGroupWrapper {...props} Component={Slider} />;

export default WrapperSlider;
