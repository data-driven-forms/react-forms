import React from 'react';
import PropTypes from 'prop-types';

const PlainText = ({ label, element, component, ...rest }) =>
  label.split('\n').map((paragraph, index) => React.createElement(element, { key: index, ...rest }, paragraph));

PlainText.propTypes = {
  label: PropTypes.string,
  element: PropTypes.string,
  component: PropTypes.string
};

PlainText.defaultProps = {
  element: 'p'
};

export default PlainText;
