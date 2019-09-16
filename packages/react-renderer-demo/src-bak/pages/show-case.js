import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DemoForms from './demo';

const ShowCase = () => (
  <Grid
    container
  >
    <Typography gutterBottom variant="h5">React Form Renderer</Typography>
    <Grid item xs={ 12 }>
      <DemoForms/>
    </Grid>
  </Grid>
);

export default ShowCase;

