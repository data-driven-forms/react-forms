/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import MUIButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormTemplate from '@data-driven-forms/common/src/form-template';

const Form = ({ children, ...props }) => <form {...props}>{children}</form>;
const Description = ({ children }) => (
  <Grid item xs={12}>
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  </Grid>
);
const Title = ({ children }) => (
  <Grid item xs={12}>
    <Typography variant="h3" gutterBottom>
      {children}
    </Typography>
  </Grid>
);
const ButtonGroup = ({ children }) => <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</div>;
const Button = ({ label, variant, children, ...props }) => (
  <MUIButton color={variant} variant="contained" {...props}>
    {label || children}
  </MUIButton>
);

const MuiFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default MuiFormTemplate;
