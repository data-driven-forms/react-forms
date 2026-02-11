import React from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

export interface PlainTextProps extends Omit<TypographyProps, 'variant'> {
  label?: React.ReactNode;
  name?: string;
  component?: React.ElementType;
  element?: React.ElementType;
  variant?: TypographyProps['variant'];
  gutterBottom?: boolean;
}

const PlainText: React.FC<PlainTextProps> = ({ label, name, component, element, variant = 'body1', gutterBottom = true, ...props }) =>
  typeof label === 'string' ? (
    <>
      {label.split('\n').map((paragraph, index) => (
        <Typography key={`${index}-${name}`} variant={variant} gutterBottom={gutterBottom} {...props} {...(element && { component: element })}>
          {paragraph}
        </Typography>
      ))}
    </>
  ) : (
    <Typography {...props} {...(element && { component: element })}>
      {label}
    </Typography>
  );

export default PlainText;
