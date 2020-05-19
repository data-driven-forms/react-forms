import React from 'react';
import PropTypes from 'prop-types';

import GenericMuiComponent from '../helpers/generic-mui-component';

const PlainText = ({ activeMapper }) => {
  return <GenericMuiComponent activeMapper={activeMapper} component="plain-text" />;
};

PlainText.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default PlainText;
