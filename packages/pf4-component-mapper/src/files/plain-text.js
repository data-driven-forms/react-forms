import React from 'react';
import PropTypes from 'prop-types';

import { TextContent, Text } from '@patternfly/react-core';
import validTextFields from '@data-driven-forms/common/src/utils/valid-text-fields';

const PlainText = ({ label, name, variant }) => (
  <TextContent>
    {typeof label === 'string'
      ? label.split('\n').map((paragraph, index) => (
          <Text component={variant} key={`${name}-${index}`}>
            {paragraph}
          </Text>
        ))
      : label}
  </TextContent>
);

PlainText.propTypes = {
  variant: PropTypes.oneOf(validTextFields),
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};

PlainText.defaultProps = {
  variant: 'p'
};

export default PlainText;
