import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useFinalFormFieldStyles = makeStyles({
  grid: {
    position: 'relative'
  }
});

const FormFieldGrid = ({ children, ...props }) => {
  const classes = useFinalFormFieldStyles();

  return (
    <Grid xs={12} item style={{ marginBottom: 16, padding: 0 }} className={classes.grid} {...props}>
      {children}
    </Grid>
  );
};

FormFieldGrid.propTypes = {
  children: PropTypes.node
};

export default FormFieldGrid;
