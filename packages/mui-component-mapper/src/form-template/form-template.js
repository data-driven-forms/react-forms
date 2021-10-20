import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button as MUIButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import FormTemplate from '@data-driven-forms/common/form-template';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    '&>button:not(last-child)': {
      marginLeft: 8,
    },
  },
}));

const Form = ({ children, GridContainerProps, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <form noValidate {...props}>
      <Grid container item spacing={2} xs={12} {...GridContainerProps}>
        {children}
      </Grid>
    </form>
  </Grid>
);

Form.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object,
  GridContainerProps: PropTypes.object,
};

const Description = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="body1" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

Description.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object,
};

const Title = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="h3" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

Title.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object,
};

const ButtonGroup = ({ children, GridProps, ...props }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} {...GridProps}>
      <div className={classes.buttonGroup} {...props}>
        {children}
      </div>
    </Grid>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node,
  GridProps: PropTypes.object,
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
  buttonType: PropTypes.string,
};

const useAlertStyles = makeStyles(() => ({
  alert: {
    width: '100%',
    margin: 8,
  },
}));

export const FormError = ({ formError, alertProps }) => {
  const { alert } = useAlertStyles();

  if (typeof formError === 'object' && (formError.title || formError.title)) {
    const { title, description, TitleProps, className, ...props } = formError;

    return (
      <Alert severity="error" {...props} {...alertProps} className={clsx(alert, alertProps?.className, className)}>
        {title && <AlertTitle {...TitleProps}>{title}</AlertTitle>}
        {description}
      </Alert>
    );
  }

  if (formError) {
    return (
      <Alert severity="error" {...alertProps} className={clsx(alert, alertProps?.className)}>
        {formError}
      </Alert>
    );
  }

  return null;
};

FormError.propTypes = {
  formError: PropTypes.any,
  alertProps: PropTypes.object,
};

const MuiFormTemplate = (props) => (
  <FormTemplate
    BeforeError={FormError}
    FormWrapper={Form}
    Button={Button}
    ButtonGroup={ButtonGroup}
    Title={Title}
    Description={Description}
    {...props}
  />
);

export default MuiFormTemplate;
