import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    marginTop: 0
  }
});

const HelperText = ({ className, children }) => {
  const classes = useStyles();
  return (
    <div>
      <p className={clsx(classes.root, className)}>{children}</p>
    </div>
  );
};

HelperText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default HelperText;
