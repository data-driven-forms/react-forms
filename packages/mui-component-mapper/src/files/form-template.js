/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Button as MUIButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FormTemplate from '@data-driven-forms/common/src/form-template';

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

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
const ButtonGroup = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.buttonGroup}>{children}</div>;
};

const Button = ({ label, variant, children, buttonType, ...props }) => (
  <MUIButton color={variant} variant="contained" {...props}>
    {label || children}
  </MUIButton>
);

const MuiFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default MuiFormTemplate;
