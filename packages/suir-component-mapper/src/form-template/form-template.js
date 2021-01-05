import React from 'react';
import PropTypes from 'prop-types';
import { Button as SuirButton, Header } from 'semantic-ui-react';

import FormTemplate from '@data-driven-forms/common/form-template';

const Form = ({ children, ...props }) => (
  <form className="ui form" noValidate {...props}>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node
};

const Description = ({ children, ...props }) => <span {...props}>{children}</span>;

Description.propTypes = {
  children: PropTypes.node
};

const Title = ({ children, ...props }) => (
  <Header as="h3" {...props}>
    {children}
  </Header>
);

Title.propTypes = {
  children: PropTypes.node
};

const ButtonGroup = ({ children, ...props }) => <div {...props}>{children}</div>;

ButtonGroup.propTypes = {
  children: PropTypes.node
};

const Button = ({ label, children, buttonType, variant, ...props }) => (
  <SuirButton color={variant === 'primary' ? 'blue' : undefined} {...props}>
    {label || children}
  </SuirButton>
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
