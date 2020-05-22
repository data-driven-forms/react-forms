import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button as MUIButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FormTemplate from '@data-driven-forms/common/src/form-template';

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    '&>button:not(last-child)': {
      marginLeft: 8
    }
  }
}));

const Form = ({ children, ...props }) => (
  <Grid item xs={12}>
    <form noValidate {...props}>
      <Grid container item spacing={2} xs={12}>
        {children}
      </Grid>
    </form>
  </Grid>
);

Form.propTypes = {
  children: PropTypes.node
};

const Description = ({ children }) => (
  <Grid item xs={12}>
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  </Grid>
);

Description.propTypes = {
  children: PropTypes.node
};

const Title = ({ children }) => (
  <Grid item xs={12}>
    <Typography variant="h3" gutterBottom>
      {children}
    </Typography>
  </Grid>
);

Title.propTypes = {
  children: PropTypes.node
};

const ButtonGroup = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <div className={classes.buttonGroup}>{children}</div>
    </Grid>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node
};

const Button = ({ label, variant, children, buttonType, ...props }) => (
  <MUIButton color={variant} variant="contained" {...props}>
    {label || children}
  </MUIButton>
);

Button.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  variant: PropTypes.string,
  buttonType: PropTypes.string
};

const MuiFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default MuiFormTemplate;
