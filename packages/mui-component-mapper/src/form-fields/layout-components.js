import React, { Fragment } from 'react';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ArrayFieldWrapper = ({ children }) => (
  <div style={{
    display: 'inline-block',
    width: '100%',
  }}>
    { children }
  </div>
);

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: ({ children, ...props }) => <Grid container spacing={ 16 } { ...props }>{ children }</Grid>,
  [layoutComponents.BUTTON]: ({ label, variant, children, ...props }) => <Grid item><Button color={ variant } variant="contained" { ...props }>{ label || children }</Button></Grid>,
  [layoutComponents.COL]: ({ children, xs, ...rest }) => <Grid item xs={ xs || 12 } key={ rest.key || rest.name }>{ children }</Grid>,
  [layoutComponents.FORM_GROUP]: ({ children }) => <Fragment>{ children }</Fragment>,
  [layoutComponents.BUTTON_GROUP]: ({ children }) => (
    <Grid
      container
      spacing={ 16 }
      direction="row"
      justify="flex-end"
      alignItems="center"
    >
      { children }
    </Grid>),
  [layoutComponents.ICON]: props => <div>Icon</div>,
  [layoutComponents.ARRAY_FIELD_WRAPPER]: props => <div>Array field</div>,
  [layoutComponents.HELP_BLOCK]: props => <div>Help block</div>,
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
