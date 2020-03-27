import React from 'react';
import PropTypes from 'prop-types';

import { TextContent, Text, TextVariants } from '@patternfly/react-core';

const PlainText = ({ label, name }) => (
  <TextContent>
    {label.split('\n').map((paragraph, index) => (
      <Text component={TextVariants.p} key={`${name}-${index}`}>
        {paragraph}
      </Text>
    ))}
  </TextContent>
);

PlainText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default PlainText;
