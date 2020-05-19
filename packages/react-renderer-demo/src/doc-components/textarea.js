import React from 'react';
import PropTypes from 'prop-types';
import SuirTextarea from './examples-texts/suir/suir-textarea.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Textarea = ({ activeMapper }) => {
  if (activeMapper === 'suir') {
    return <SuirTextarea />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="textarea" />;
};

Textarea.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Textarea;
