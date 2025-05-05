import React from 'react';

import { Text } from '@blueprintjs/core';

const PlainText = ({ component, label, name, ...props }) => {
  return <Text {...props}>{label}</Text>;
};

export default PlainText;
