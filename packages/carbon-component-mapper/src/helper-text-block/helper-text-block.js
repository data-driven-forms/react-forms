import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  helperTextStyle: {
    color: '#da1e28',
    display: 'block',
    overflow: 'initial'
  }
});

const HelperTextBlock = ({ helperText, errorText, warnText }) => {
  const { helperTextStyle } = useStyles();

  if (errorText) {
    return <div className={helperTextStyle}>{errorText}</div>;
  }

  if (warnText) {
    return <div className={helperTextStyle}>{warnText}</div>;
  }

  if (helperText) {
    return <div className="bx--form__helper-text">{helperText}</div>;
  }

  return null;
};

HelperTextBlock.propTypes = {
  helperText: PropTypes.node,
  errorText: PropTypes.node,
  warnText: PropTypes.node
};

export default HelperTextBlock;
