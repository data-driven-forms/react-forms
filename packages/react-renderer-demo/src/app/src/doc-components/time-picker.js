import React from 'react';
import PropTypes from 'prop-types';
import MuiTimePicker from './examples-texts/mui/mui-time-picker.md';
import SuirTimePicker from './examples-texts/suir/suir-time-picker.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const TimePicker = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiTimePicker />;
  }

  if (activeMapper === 'suir') {
    return <SuirTimePicker />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="time-picker" />;
};

TimePicker.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default TimePicker;
