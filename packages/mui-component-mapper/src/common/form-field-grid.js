import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

const FormFieldGrid = ({ children, ...props }) => (
  <Grid xs={12} item style={{ marginBottom: 16, padding: 0 }} {...props}>
    {children}
  </Grid>
);

FormFieldGrid.propTypes = {
  children: PropTypes.node
};

export default FormFieldGrid;
