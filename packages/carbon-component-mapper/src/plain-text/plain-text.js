import React from 'react';
import PropTypes from 'prop-types';

const PlainText = ({ label, element = 'p', component, ...rest }) =>
  label.split('\n').map((paragraph, index) => React.createElement(element, { key: index, ...rest }, paragraph));

PlainText.propTypes = {
  label: PropTypes.string,
  element: PropTypes.string,
  component: PropTypes.string,
};

export default PlainText;
