import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const useStyles = makeStyles(() => ({
  grid: {
    paddingRight: 0,
    paddingLeft: 0
  }
}));

const SubForm = ({ fields, title, description, component, ...rest }) => {
  const { renderForm } = useFormApi();
  const classes = useStyles();

  return (
    <Grid item xs={12} container className={classes.grid} {...rest}>
      {title && (
        <Grid item xs={12}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      )}
      {description && (
        <Grid item xs={12}>
          <Typography paragraph>{description}</Typography>
        </Grid>
      )}
      <Grid item xs={12} container>
        {renderForm(fields)}
      </Grid>
    </Grid>
  );
};

SubForm.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  component: PropTypes.any
};

export default SubForm;
