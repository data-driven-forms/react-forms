import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const PREFIX = 'SubForm';

const classes = {
  grid: `${PREFIX}-grid`,
};

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.grid}`]: {
    paddingRight: 0,
    paddingLeft: 0,
  },
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
  return (
    <StyledGrid item xs={12} container className={classes.grid} {...rest}>
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
      <Grid item xs={12} container rowSpacing={2} {...ItemsGridProps}>
        {renderForm(fields)}
      </Grid>
    </StyledGrid>
  );
};

export default SubForm;
