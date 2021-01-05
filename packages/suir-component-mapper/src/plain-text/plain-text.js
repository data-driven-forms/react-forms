import React from 'react';
import PropTypes from 'prop-types';
import validTextFields from '@data-driven-forms/common/src/utils/valid-text-fields';

const PlainText = ({ variant, label, name, ...rest }) =>
  typeof label === 'string'
    ? label.split('\n').map((paragraph, index) => React.createElement(variant, { key: `${name}-${index}`, ...rest }, paragraph))
    : { label };

PlainText.propTypes = {
  variant: PropTypes.oneOf(validTextFields),
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};

PlainText.defaultProps = {
  variant: 'p'
};

export default PlainText;
