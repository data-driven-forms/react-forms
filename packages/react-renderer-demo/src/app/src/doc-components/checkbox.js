import React from 'react';
import PropTypes from 'prop-types';
import MuiCheckbox from './examples-texts/mui/mui-checkbox.md';
import SuirCheckbox from './examples-texts/suir/suir-checkbox.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Checkbox = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiCheckbox />;
  }

  if (activeMapper === 'suir') {
    return <SuirCheckbox />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="checkbox" />;
};

Checkbox.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Checkbox;
