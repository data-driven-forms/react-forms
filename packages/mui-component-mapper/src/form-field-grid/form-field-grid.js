import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

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

FormFieldGrid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FormFieldGrid;
