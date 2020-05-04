import React from 'react';
import PropTypes from 'prop-types';

const PlainText = ({ label, name, ...props }) =>
  label.split('\n').map((paragraph, index) => (
    <p key={`${index}-${name}`} {...props}>
      {paragraph}
    </p>
  ));

PlainText.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};

export default PlainText;
