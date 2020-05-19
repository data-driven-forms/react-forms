import React from 'react';
import PropTypes from 'prop-types';
import Pf4Select from './examples-texts/pf4/pf4-select.md';
import Pf3Select from './examples-texts/pf3/pf3-select.md';
import SuirSelect from './examples-texts/suir/suir-select.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Select = ({ activeMapper }) => {
  if (activeMapper === 'pf4') {
    return <Pf4Select />;
  }

  if (activeMapper === 'pf3') {
    return <Pf3Select />;
  }

  if (activeMapper === 'suir') {
    return <SuirSelect />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="select" />;
};

Select.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Select;
