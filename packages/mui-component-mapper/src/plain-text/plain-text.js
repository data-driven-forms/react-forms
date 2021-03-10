import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const PlainText = ({ label, name, component, element, ...props }) =>
  typeof label === 'string' ? (
    label.split('\n').map((paragraph, index) => (
      <Typography key={`${index}-${name}`} {...props} {...(element && { component: element })}>
        {paragraph}
      </Typography>
    ))
  ) : (
    <Typography {...props} {...(element && { component: element })}>
      {label}
    </Typography>
  );

PlainText.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.any,
  element: PropTypes.elementType
};

PlainText.defaultProps = {
  variant: 'body1',
  gutterBottom: true
};

export default PlainText;
