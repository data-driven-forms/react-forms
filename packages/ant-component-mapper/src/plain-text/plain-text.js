import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const PlainText = ({ label, name, TypographyProps, ...rest }) => (
  <Typography {...TypographyProps}>
    {label.split('\n').map((paragraph, index) => (
      <Paragraph key={`${index}-${name}`} {...rest}>
        {paragraph}
      </Paragraph>
    ))}
  </Typography>
);

export default PlainText;
