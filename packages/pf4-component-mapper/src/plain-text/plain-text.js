import React from 'react';
import PropTypes from 'prop-types';

import { Content } from '@patternfly/react-core';
import validTextFields from '@data-driven-forms/common/utils/valid-text-fields';

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

PlainText.propTypes = {
  variant: PropTypes.oneOf(validTextFields),
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  TextContentProps: PropTypes.object,
  component: PropTypes.string,
};

export default PlainText;
