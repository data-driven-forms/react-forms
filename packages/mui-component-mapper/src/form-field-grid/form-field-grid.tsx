import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import type { GridProps } from '@mui/material';
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

export interface FormFieldGridProps extends Omit<GridProps, 'xs' | 'item'> {
  children: React.ReactNode;
  className?: string;
}

const FormFieldGrid: React.FC<FormFieldGridProps> = ({ children, className, ...props }) => (
  <StyledGrid xs={12} item className={clsx(classes.grid, className)} {...props}>
    {children}
  </StyledGrid>
);

export default FormFieldGrid;
