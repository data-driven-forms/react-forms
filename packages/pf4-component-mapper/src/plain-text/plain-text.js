import React from 'react';
import PropTypes from 'prop-types';

import { TextContent, Text } from '@patternfly/react-core';
import validTextFields from '@data-driven-forms/common/utils/valid-text-fields';

const PlainText = ({ component, label, name, variant = 'p', TextContentProps, ...rest }) => (
  <TextContent {...TextContentProps}>
    {typeof label === 'string'
      ? label.split('\n').map((paragraph, index) => (
          <Text component={variant} {...rest} key={`${name}-${index}`}>
            {paragraph}
          </Text>
        ))
      : label}
  </TextContent>
);

PlainText.propTypes = {
  variant: PropTypes.oneOf(validTextFields),
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  TextContentProps: PropTypes.object,
  component: PropTypes.string,
};

export default PlainText;
