import React from 'react';
import PropTypes from 'prop-types';

import './helper-text-block.scss';

const HelperTextBlock = ({ helperText, errorText }) => {
  if (errorText) {
    return <div className="bx--form-requirement ddorg__carbon-error-helper-text">{errorText}</div>;
  }

  if (helperText) {
    return <div className="bx--form__helper-text">{helperText}</div>;
  }

  return null;
};

HelperTextBlock.propTypes = {
  helperText: PropTypes.node,
  errorText: PropTypes.node
};

export default HelperTextBlock;
