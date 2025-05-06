import React from 'react';

const PlainText = ({ variant = 'p', label, name, ...rest }) =>
  typeof label === 'string'
    ? label.split('\n').map((paragraph, index) => React.createElement(variant, { key: `${name}-${index}`, ...rest }, paragraph))
    : { label };

export default PlainText;
