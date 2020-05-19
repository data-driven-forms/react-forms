import React from 'react';
import PropTypes from 'prop-types';
import MuiRadio from './examples-texts/mui/mui-radio.md';
import SuirRadio from './examples-texts/suir/suir-radio.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Radio = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiRadio />;
  }

  if (activeMapper === 'suir') {
    return <SuirRadio />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="radio" />;
};

Radio.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Radio;
