import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const PlainText = ({ label, name, component, ...props }) =>
  typeof label === 'string' ? (
    label.split('\n').map((paragraph, index) => (
      <Typography key={`${index}-${name}`} {...props}>
        {paragraph}
      </Typography>
    ))
  ) : (
    <Typography {...props}>{label}</Typography>
  );

PlainText.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.any
};

PlainText.defaultProps = {
  variant: 'body1',
  gutterBottom: true
};

export default PlainText;
