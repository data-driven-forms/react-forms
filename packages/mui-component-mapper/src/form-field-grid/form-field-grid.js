import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

const useFinalFormFieldStyles = makeStyles({
  grid: {
    position: 'relative',
  },
});

const FormFieldGrid = ({ children, className, ...props }) => {
  const classes = useFinalFormFieldStyles();

  return (
    <Grid xs={12} item className={clsx(classes.grid, className)} {...props}>
      {children}
    </Grid>
  );
};

FormFieldGrid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FormFieldGrid;
