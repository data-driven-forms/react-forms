import React from 'react';
import PropTypes from 'prop-types';

import FormTemplate from '@data-driven-forms/common/form-template';

import { Button as UI5Button, Form as UI5Form } from '@ui5/webcomponents-react';

export const Button = ({ label, buttonType, ...props }) => <UI5Button {...props}>{label}</UI5Button>;

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  buttonType: PropTypes.string,
};

export const ButtonGroup = ({ children, ...props }) => <div {...props}>{children}</div>;

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const Title = ({ children, ...props }) => <h1 {...props}>{children}</h1>;

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const Description = ({ children, ...props }) => <div {...props}>{children}</div>;

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const Form = ({ children, ...props }) => (
  <UI5Form noValidate {...props}>
    {children}
  </UI5Form>
);

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const WrappedFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default WrappedFormTemplate;
