import React from 'react';
import { Button as SuirButton, Header } from 'semantic-ui-react';

import FormTemplate from '@data-driven-forms/common/form-template';

const Form = ({ children, ...props }) => (
  <form className="ui form" noValidate {...props}>
    {children}
  </form>
);

const Description = ({ children, ...props }) => <span {...props}>{children}</span>;

const Title = ({ children, ...props }) => (
  <Header as="h3" {...props}>
    {children}
  </Header>
);

const ButtonGroup = ({ children, ...props }) => <div {...props}>{children}</div>;

const Button = ({ label, children, buttonType, variant, ...props }) => (
  <SuirButton color={variant === 'primary' ? 'blue' : undefined} {...props}>
    {label || children}
  </SuirButton>
);

const MuiFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default MuiFormTemplate;
