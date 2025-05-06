import React from 'react';

import { Content } from '@patternfly/react-core';

const PlainText = ({ component, label, name, variant = 'p', TextContentProps, ...rest }) => (
  <Content {...TextContentProps}>
    {typeof label === 'string'
      ? label.split('\n').map((paragraph, index) => (
          <Content component={variant} {...rest} key={`${name}-${index}`}>
            {paragraph}
          </Content>
        ))
      : label}
  </Content>
);

export default PlainText;
