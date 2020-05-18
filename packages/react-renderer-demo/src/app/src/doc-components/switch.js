import React from 'react';
import PropTypes from 'prop-types';
import MuiSwitch from './examples-texts/mui/mui-switch.md';
import SuirSwitch from './examples-texts/suir/suir-switch.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Switch = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiSwitch />;
  }

  if (activeMapper === 'suir') {
    return <SuirSwitch />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="switch" />;
};

Switch.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Switch;
