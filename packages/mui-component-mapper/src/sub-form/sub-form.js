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

const SubForm = ({
  fields,
  title,
  description,
  component,
  TitleGridProps,
  TitleProps,
  DescriptionProps,
  DescriptionGridProps,
  ItemsGridProps,
  ...rest
}) => {
  const { renderForm } = useFormApi();
  const classes = useStyles();

  return (
    <Grid item xs={12} container className={classes.grid} {...rest}>
      {title && (
        <Grid item xs={12} {...TitleGridProps}>
          <Typography variant="h5" {...TitleProps}>
            {title}
          </Typography>
        </Grid>
      )}
      {description && (
        <Grid item xs={12} {...DescriptionGridProps}>
          <Typography paragraph {...DescriptionProps}>
            {description}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} container {...ItemsGridProps}>
        {renderForm(fields)}
      </Grid>
    </Grid>
  );
};

SubForm.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  component: PropTypes.any,
  TitleGridProps: PropTypes.object,
  TitleProps: PropTypes.object,
  DescriptionProps: PropTypes.object,
  DescriptionGridProps: PropTypes.object,
  ItemsGridProps: PropTypes.object
};

export default SubForm;
