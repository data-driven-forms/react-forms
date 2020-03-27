import React from 'react';
import PropTypes from 'prop-types';

const validTextFields = [
  'p',
  'span',
  'strong',
  'b',
  'cite',
  'caption',
  'code',
  'em',
  'i',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h6',
  'div',
  'label',
  'pre',
  'q',
  'samp',
  'small',
  'sub',
  'sup'
];

const PlainText = ({ variant, label, name }) =>
  label.split('\n').map((paragraph, index) => React.createElement(variant, { key: `${name}-${index}` }, paragraph));

PlainText.propTypes = {
  variant: PropTypes.oneOf(validTextFields),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

PlainText.defaultProps = {
  variant: 'p'
};

export default PlainText;
