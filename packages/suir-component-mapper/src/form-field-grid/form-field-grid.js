import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import HelperText from '../helper-text/helper-text';

const useStyles = createUseStyles({
  root: {
    marginTop: '1em',
    marginBottom: '1em'
  }
});

const FormFieldGrid = ({ className, children, helperText, HelperTextProps }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      {children}
      {helperText && <HelperText {...HelperTextProps}>{helperText}</HelperText>}
    </div>
  );
};

FormFieldGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  helperText: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  HelperTextProps: PropTypes.object
};

export default FormFieldGrid;
