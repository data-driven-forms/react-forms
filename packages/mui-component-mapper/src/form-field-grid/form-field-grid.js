import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useFinalFormFieldStyles = makeStyles({
  grid: {
    position: 'relative'
  }
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
  className: PropTypes.string
};

export default FormFieldGrid;
