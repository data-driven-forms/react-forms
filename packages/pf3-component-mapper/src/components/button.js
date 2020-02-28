import React from 'react';
import PropTypes from 'prop-types';
import { Button as PFButton } from 'patternfly-react';

export const Button = ({ label, variant, className, ...rest }) => (
  <PFButton bsStyle={variant} className={className} {...rest}>
    {label}
  </PFButton>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  className: ''
};

export default Button;
