import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Form as CarbonForm, Button as CarbonButton, ButtonSet } from 'carbon-components-react';

import FormTemplate from '@data-driven-forms/common/form-template';

const useStyles = createUseStyles({
  buttons: {
    marginTop: 48
  },
  header: {
    marginBottom: 40,
    div: {
      marginTop: 8
    }
  },
  form: {
    '&>:not(:last-child)': {
      marginBottom: 32
    }
  }
});

export const Button = ({ label, buttonType, ...props }) => (
  <CarbonButton kind={buttonType === 'submit' ? 'primary' : 'secondary'} {...props}>
    {label}
  </CarbonButton>
);

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  buttonType: PropTypes.string
};

export const ButtonGroup = ({ children, className, ...props }) => {
  const { butttons } = useStyles();

  return (
    <ButtonSet {...props} className={clsx(butttons, className)}>
      {children}
    </ButtonSet>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string
};

export const Title = ({ children, ...props }) => <h3 {...props}>{children}</h3>;

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Description = ({ children, ...props }) => <div {...props}>{children}</div>;

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Form = ({ children, className, ...props }) => {
  const { form } = useStyles();

  return (
    <CarbonForm noValidate {...props} className={clsx(form, className)}>
      {children}
    </CarbonForm>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string
};

export const Header = (props) => {
  const { header } = useStyles();

  return <div className={header} {...props} />;
};

const WrappedFormTemplate = (props) => (
  <FormTemplate
    FormWrapper={Form}
    Button={Button}
    ButtonGroup={ButtonGroup}
    Title={Title}
    Description={Description}
    buttonOrder={['submit', 'reset', 'cancel']}
    Header={Header}
    {...props}
  />
);

export default WrappedFormTemplate;
