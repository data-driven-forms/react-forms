import React from 'react';
import { Button, Typography, Form as AntForm } from 'antd';
import FormTemplate from '@data-driven-forms/common/form-template';

const { Title, Paragraph } = Typography;

const Form = ({ children, onSubmit, layout = 'vertical', ...props }) => (
  <AntForm onFinish={onSubmit} layout={layout} {...props}>
    {children}
  </AntForm>
);

const Description = ({ children, ...props }) => (
  <Typography {...props}>
    <Paragraph>{children}</Paragraph>
  </Typography>
);

const TitleComponent = ({ children, ...props }) => (
  <Typography {...props}>
    <Title level={3}>{children}</Title>
  </Typography>
);

const ButtonGroup = ({ children, ...props }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }} {...props}>
    {children}
  </div>
);

const ButtonComponent = ({ label, variant, children, buttonType, ...props }) => (
  <Button {...props} type="primary" htmlType={props.type}>
    {label || children}
  </Button>
);

const AntFormTemplate = ({ layout, formWrapperProps, ...props }) => (
  <FormTemplate
    FormWrapper={Form}
    Button={ButtonComponent}
    ButtonGroup={ButtonGroup}
    Title={TitleComponent}
    Description={Description}
    formWrapperProps={{ layout, ...formWrapperProps }}
    {...props}
  />
);

export default AntFormTemplate;
