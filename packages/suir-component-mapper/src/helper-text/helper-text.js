import React from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    marginTop: 0,
  },
});

const HelperText = ({ className, children }) => {
  const classes = useStyles();
  return (
    <div>
      <p className={clsx(classes.root, className)}>{children}</p>
    </div>
  );
};

export default HelperText;
