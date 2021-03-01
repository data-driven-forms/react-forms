import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@blueprintjs/core';

const PlainText = ({ component, label, name, ...props }) => {
  return <Text {...props}>{label}</Text>;
};

PlainText.propTypes = {
  component: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string
};

export default PlainText;
