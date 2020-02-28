import React from 'react';
import PropTypes from 'prop-types';
import { Button as PFButton } from 'patternfly-react';

export const Button = ({ label, variant, className, ...rest }) => {
  const { formOptions, FieldProvider, validate, ...props } = { ...rest };
  return <PFButton bsStyle={ variant } className={ className } { ...props }>{ label }</PFButton>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
