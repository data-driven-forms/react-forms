import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  helperTextStyle: {
    color: '#da1e28',
    display: 'block',
    overflow: 'initial',
  },
});

const HelperTextBlock = ({ helperText, errorText, warnText }) => {
  const { helperTextStyle } = useStyles();

  if (errorText) {
    return <div className={`cds--form-requirement ddorg__carbon-error-helper-text ${helperTextStyle}`}>{errorText}</div>;
  }

  if (warnText) {
    return <div className={`cds--form-requirement ddorg__carbon-error-helper-text ${helperTextStyle}`}>{warnText}</div>;
  }

  if (helperText) {
    return <div className="cds--form__helper-text">{helperText}</div>;
  }

  return null;
};

export default HelperTextBlock;
