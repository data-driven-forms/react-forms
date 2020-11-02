import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Form as CarbonForm, Button as CarbonButton, ButtonSet } from 'carbon-components-react';

import FormTemplate from '@data-driven-forms/common/src/form-template';

import './form-template.scss';

export const Button = ({ label, buttonType, ...props }) => (
  <CarbonButton kind={buttonType === 'submit' ? 'primary' : 'secondary'} {...props}>
    {label}
  </CarbonButton>
);

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  buttonType: PropTypes.string
};

export const ButtonGroup = ({ children, className, ...props }) => (
  <ButtonSet {...props} className={clsx('ddorg__carbon-form-template-buttons', className)}>
    {children}
  </ButtonSet>
);

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

export const Form = ({ children, className, ...props }) => (
  <CarbonForm noValidate {...props} className={clsx('ddorg__carbon-form-template-form', className)}>
    {children}
  </CarbonForm>
);

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string
};

export const Header = (props) => <div className="ddorg__carbon-form-template-header" {...props} />;

const WrappedFormTemplate = (props) => (
  <FormTemplate
    FormWrapper={Form}
    Button={Button}
    ButtonGroup={ButtonGroup}
    Title={Title}
    Description={Description}
    buttonOrder={['cancel', 'reset', 'submit']}
    Header={Header}
    {...props}
  />
);

export default WrappedFormTemplate;
