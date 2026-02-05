import React from 'react';
import { Content, ContentProps } from '@patternfly/react-core';

export interface PlainTextProps {
  component?: any;
  label?: React.ReactNode;
  name?: string;
  variant?: ContentProps['component'];
  TextContentProps?: ContentProps;
  [key: string]: any;
}

const PlainText: React.FC<PlainTextProps> = ({ component, label, name, variant = 'p', TextContentProps, ...rest }) => (
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

// PlainTextProps is exported above
