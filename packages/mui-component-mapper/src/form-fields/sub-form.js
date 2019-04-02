import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const SubForm = ({
  formOptions,
  fields,
  title,
  description,
}) => (
  <Grid item xs={ 12 } container style={{ paddingRight: 0, paddingLeft: 0 }}>
    { title && <Grid item xs={ 12 }><Typography variant="h5">{ title }</Typography></Grid> }
    { description && <Grid item xs={ 12 }><Typography paragraph>{ description }</Typography></Grid> }
    <Grid item xs={ 12 } container>
      { formOptions.renderForm(fields) }
    </Grid>
  </Grid>
);

SubForm.propTypes = {
  formOptions: PropTypes.object.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SubForm;
