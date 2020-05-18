import React from 'react';
import PropTypes from 'prop-types';
import MuiSlider from './examples-texts/mui/mui-slider.md';
import Pf4Slider from './examples-texts/pf4/pf4-slider.md';
import Pf3Slider from './examples-texts/pf3/pf3-slider.md';
import SuirSlider from './examples-texts/suir/suir-slider.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Slider = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiSlider />;
  }

  if (activeMapper === 'pf4') {
    return <Pf4Slider />;
  }

  if (activeMapper === 'pf3') {
    return <Pf3Slider />;
  }

  if (activeMapper === 'suir') {
    return <SuirSlider />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="slider" />;
};

Slider.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Slider;
