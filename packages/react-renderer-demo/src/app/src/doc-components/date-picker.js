import React from 'react';
import PropTypes from 'prop-types';
import MuiDatePicker from './examples-texts/mui/mui-date-picker.md';
import BlueprintDatePicker from './examples-texts/blueprint/blueprint-date-picker.md';
import SuirDatePicker from './examples-texts/suir/suir-date-picker.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const DatePicker = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiDatePicker />;
  }

  if (activeMapper === 'blueprint') {
    return <BlueprintDatePicker />;
  }

  if (activeMapper === 'suir') {
    return <SuirDatePicker />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="date-picker" />;
};

DatePicker.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default DatePicker;
