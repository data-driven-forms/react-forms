import React from 'react';
import { styled } from '@mui/material/styles';

import { Grid } from '@mui/material';
import clsx from 'clsx';

const PREFIX = 'FormFieldGrid';

const classes = {
  grid: `${PREFIX}-grid`,
};

const StyledGrid = styled(Grid)({
  [`&.${classes.grid}`]: {
    position: 'relative',
  },
});

const FormFieldGrid = ({ children, className, ...props }) => (
  <StyledGrid xs={12} item className={clsx(classes.grid, className)} {...props}>
    {children}
  </StyledGrid>
);

export default FormFieldGrid;
