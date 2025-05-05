import React from 'react';

import FormGroupWrapper from '../form-group/form-group';

import { Slider as BSlider } from '@blueprintjs/core';
import propsCatcher from '../props-catcher/props-catcher';

const Slider = ({ input, step, ...props }) => <BSlider stepSize={step} {...propsCatcher(props)} {...input} value={input.value || 0} />;

const WrapperSlider = (props) => <FormGroupWrapper {...props} Component={Slider} />;

export default WrapperSlider;
