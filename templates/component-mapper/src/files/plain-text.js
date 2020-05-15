import React from 'react';
import PropTypes from 'prop-types';

const PlainText = ({ label }) => label.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>);

PlainText.propTypes = {
  label: PropTypes.string
};

export default PlainText;
