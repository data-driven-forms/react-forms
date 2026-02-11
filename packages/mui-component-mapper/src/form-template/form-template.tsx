import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Button as MUIButton, Typography } from '@mui/material';
import type { GridProps, ButtonProps, TypographyProps } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import type { AlertProps, AlertTitleProps } from '@mui/material';

import FormTemplate from '@data-driven-forms/common/form-template';
import type { FormTemplateCommonProps } from '@data-driven-forms/common/form-template';
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

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  GridContainerProps?: GridProps;
  GridProps?: GridProps;
}

const Form: React.FC<FormProps> = ({ children, GridContainerProps, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <form noValidate {...props}>
      <Grid container rowSpacing={2} item xs={12} {...GridContainerProps}>
        {children}
      </Grid>
    </form>
  </Grid>
);

interface DescriptionProps extends TypographyProps {
  children: React.ReactNode;
  GridProps?: GridProps;
}

const Description: React.FC<DescriptionProps> = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="body1" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

interface TitleProps extends TypographyProps {
  children: React.ReactNode;
  GridProps?: GridProps;
}

const Title: React.FC<TitleProps> = ({ children, GridProps, ...props }) => (
  <Grid item xs={12} {...GridProps}>
    <Typography variant="h3" gutterBottom {...props}>
      {children}
    </Typography>
  </Grid>
);

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  GridProps?: GridProps;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, GridProps, ...props }) => (
  <StyledButtonGroup item xs={12} {...GridProps}>
    <div className={classes.buttonGroup} {...props}>
      {children}
    </div>
  </StyledButtonGroup>
);

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  label?: React.ReactNode;
  variant?: 'primary' | 'secondary' | ButtonProps['color'];
  children?: React.ReactNode;
  buttonType?: string;
}

const Button: React.FC<CustomButtonProps> = ({ label, variant, children, buttonType, ...props }) => (
  <MUIButton color={variant as ButtonProps['color']} variant="contained" {...props}>
    {label || children}
  </MUIButton>
);

const StyledAlert = styled(Alert)(() => ({
  '& .alert': {
    width: '100%',
    margin: 8,
  },
}));

interface FormErrorObject {
  title?: React.ReactNode;
  description?: React.ReactNode;
  TitleProps?: AlertTitleProps;
  className?: string;
  [key: string]: any;
}

interface FormErrorProps {
  formError?: string | FormErrorObject;
  alertProps?: AlertProps;
}

export const FormError: React.FC<FormErrorProps> = ({ formError, alertProps }) => {
  if (typeof formError === 'object' && formError && (formError.title || formError.description)) {
    const { title, description, TitleProps, className, ...props } = formError;

    return (
      <StyledAlert severity="error" {...props} {...alertProps} className={clsx('alert', alertProps?.className, className)}>
        {title && <AlertTitle {...TitleProps}>{title}</AlertTitle>}
        {description}
      </StyledAlert>
    );
  }

  if (typeof formError === 'string' && formError) {
    return (
      <StyledAlert severity="error" {...alertProps} className={clsx('alert', alertProps?.className)}>
        {formError}
      </StyledAlert>
    );
  }

  return null;
};

const MuiFormTemplate: React.FC<FormTemplateCommonProps> = (props) => (
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
