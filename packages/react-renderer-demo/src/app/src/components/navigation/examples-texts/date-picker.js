import React from 'react';
import Blueprint from '@docs/doc-components/blueprint-date-picker.md';

import PropTypes from 'prop-types';
import GenericMuiComponent from './generic-mui-component';

const DatePickerDoc = ({ activeMapper }) => {
  if (activeMapper === 'blueprint') {
    return <Blueprint />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="date-picker" />;
};

DatePickerDoc.propTypes = {
  activeMapper: PropTypes.string
};

export default DatePickerDoc;
