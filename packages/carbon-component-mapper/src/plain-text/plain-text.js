import React from 'react';

const PlainText = ({ label, element = 'p', component, ...rest }) =>
  label.split('\n').map((paragraph, index) => React.createElement(element, { key: index, ...rest }, paragraph));

export default PlainText;
