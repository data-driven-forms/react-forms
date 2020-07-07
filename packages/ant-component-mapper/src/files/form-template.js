/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Typography, Form as AntForm } from 'antd';
import FormTemplate from '@data-driven-forms/common/src/form-template';

const { Title, Paragraph } = Typography;

const Form = ({ layout, children, onSubmit, ...props }) => (
  <AntForm onFinish={onSubmit} layout={layout ? layout : 'vertical'} {...props}>
    {children}
  </AntForm>
);

const Description = ({ children }) => (
  <Typography>
    <Paragraph>{children}</Paragraph>
  </Typography>
);
const TitleComponent = ({ children }) => (
  <Typography>
    <Title level={3}>{children}</Title>
  </Typography>
);

const ButtonGroup = ({ children }) => <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</div>;
const ButtonComponent = ({ label, variant, children, buttonType, ...props }) => (
  <Button {...props} type="primary" htmlType={props.type}>
    {label || children}
  </Button>
);

const AntFormTemplate = (props) => (
  <FormTemplate
    FormWrapper={Form}
    Button={ButtonComponent}
    ButtonGroup={ButtonGroup}
    Title={TitleComponent}
    Description={Description}
    formWrapperProps={{ layout: props.layout, ...props.formWrapperProps }}
    {...props}
  />
);

export default AntFormTemplate;
