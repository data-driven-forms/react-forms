import React from 'react';
import { Typography } from '@mui/material';

const PlainText = ({ label, name, component, element, variant = 'body1', gutterBottom = true, ...props }) =>
  typeof label === 'string' ? (
    label.split('\n').map((paragraph, index) => (
      <Typography key={`${index}-${name}`} variant={variant} gutterBottom={gutterBottom} {...props} {...(element && { component: element })}>
        {paragraph}
      </Typography>
    ))
  ) : (
    <Typography {...props} {...(element && { component: element })}>
      {label}
    </Typography>
  );

export default PlainText;
