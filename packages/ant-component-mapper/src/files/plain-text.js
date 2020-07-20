import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

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

PlainText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  TypographyProps: PropTypes.object
};

export default PlainText;
