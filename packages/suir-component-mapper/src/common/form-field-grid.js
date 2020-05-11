import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import HelperText from './helper-text';

const useStyles = createUseStyles({
  root: {
    marginBottom: 8
  }
});

const FormFieldGrid = ({ className, children, helperText }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      {children}
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

FormFieldGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  helperText: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

export default FormFieldGrid;
