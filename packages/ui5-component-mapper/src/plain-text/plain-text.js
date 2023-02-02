import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@ui5/webcomponents-react';

const PlainText = ({ label }) => (
  <FormItem>
    {label.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
  </FormItem>
);

PlainText.propTypes = {
  label: PropTypes.string,
};

export default PlainText;
