import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const SubForm = ({ fields, title, description, FormSpyProvider: _FormSpyProvider, validate: _validate, ...rest }) => {
  const { renderForm } = useFormApi();
  return (
    <Grid item xs={12} container style={{ paddingRight: 0, paddingLeft: 0 }} {...rest}>
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
  title: PropTypes.string,
  description: PropTypes.string,
  FormSpyProvider: PropTypes.any,
  validate: PropTypes.any
};

export default SubForm;
