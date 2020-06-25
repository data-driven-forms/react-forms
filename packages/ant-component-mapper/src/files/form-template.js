/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Typography } from 'antd';
import FormTemplate from '@data-driven-forms/common/src/form-template';

const { Title, Paragraph } = Typography;

const Form = ({ children, ...props }) => <form {...props}>{children}</form>;
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
  <FormTemplate FormWrapper={Form} Button={ButtonComponent} ButtonGroup={ButtonGroup} Title={TitleComponent} Description={Description} {...props} />
);

export default AntFormTemplate;
