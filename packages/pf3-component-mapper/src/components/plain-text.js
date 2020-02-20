import React from 'react';
import PropTypes from 'prop-types';

const PlainText = ({ label, name }) => label.split('\n').map((paragraph, index) => <p key={`${name}-${index}`}>{paragraph}</p>);

PlainText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default PlainText;
