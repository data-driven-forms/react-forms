import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Button as MUIButton, Typography } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';

import FormTemplate from '@data-driven-forms/common/form-template';
import clsx from 'clsx';

const PREFIX = 'MuiFormTemplate';

const classes = {
  buttonGroup: `${PREFIX}-buttonGroup`,
};

const StyledButtonGroup = styled(Grid)(() => ({
  [`& .${classes.buttonGroup}`]: {
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
      <Grid container rowSpacing={2} item xs={12} {...GridContainerProps}>
        {children}
      </Grid>
    </form>
  </Grid>
);

const Description = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="body1" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

const Title = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="h3" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

const ButtonGroup = ({ children, GridProps, ...props }) => (
  <StyledButtonGroup item xs={12} {...GridProps}>
    <div className={classes.buttonGroup} {...props}>
      {children}
    </div>
  </StyledButtonGroup>
);

const Button = ({ label, variant, children, buttonType, ...props }) => (
  <MUIButton color={variant} variant="contained" {...props}>
    {label || children}
  </MUIButton>
);

const StyledAlert = styled(Alert)(() => ({
  '& .alert': {
    width: '100%',
    margin: 8,
  },
}));

export const FormError = ({ formError, alertProps }) => {
  if (typeof formError === 'object' && (formError.title || formError.title)) {
    const { title, description, TitleProps, className, ...props } = formError;

    return (
      <StyledAlert severity="error" {...props} {...alertProps} className={clsx('alert', alertProps?.className, className)}>
        {title && <AlertTitle {...TitleProps}>{title}</AlertTitle>}
        {description}
      </StyledAlert>
    );
  }

  if (formError) {
    return (
      <StyledAlert severity="error" {...alertProps} className={clsx('alert', alertProps?.className)}>
        {formError}
      </StyledAlert>
    );
  }

  return null;
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
