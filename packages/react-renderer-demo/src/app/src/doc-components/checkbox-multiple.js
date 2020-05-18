import React from 'react';
import PropTypes from 'prop-types';
import MuiCheckboxMultiple from './examples-texts/mui/mui-checkbox-multiple.md';
import SuirCheckboxMultiple from './examples-texts/suir/suir-checkbox-multiple.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const CheckboxMultiple = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiCheckboxMultiple />;
  }

  if (activeMapper === 'suir') {
    return <SuirCheckboxMultiple />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="checkbox-multiple" />;
};

CheckboxMultiple.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default CheckboxMultiple;
