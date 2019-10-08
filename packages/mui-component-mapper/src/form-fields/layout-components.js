import React from 'react';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: ({ children, ...props }) => <form { ...props }>{ children }</form>,
  [layoutComponents.BUTTON]: ({ label, variant, children, ...props }) => <Button color={ variant } variant="contained" { ...props }>{ label || children }</Button>,
  [layoutComponents.BUTTON_GROUP]: ({ children }) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      { children }
    </div>),
  [layoutComponents.TITLE]: ({ children }) => <Grid item xs={ 12 }>
    <Typography variant="h3" gutterBottom>
      { children }
    </Typography>
  </Grid>,
  [layoutComponents.DESCRIPTION]: ({ children }) => <Grid item xs={ 12 }>
    <Typography variant="body1" gutterBottom>
      { children }
    </Typography>
  </Grid>,
};

export default layoutMapper;
