import React from 'react';
import PropTypes from 'prop-types';
import SuirTextField from './examples-texts/suir/suir-text-field.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const TextField = ({ activeMapper }) => {
  if (activeMapper === 'suir') {
    return <SuirTextField />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="text-field" />;
};

TextField.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default TextField;
