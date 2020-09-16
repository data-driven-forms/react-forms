import React from 'react';
import PropTypes from 'prop-types';

import GenericMuiComponent from '../helpers/generic-mui-component';
import CarbonPlainText from './examples-texts/carbon/carbon-plain-text.md';

const PlainText = ({ activeMapper }) => {
  if (activeMapper === 'carbon') {
    return <CarbonPlainText />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="plain-text" />;
};

PlainText.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default PlainText;
