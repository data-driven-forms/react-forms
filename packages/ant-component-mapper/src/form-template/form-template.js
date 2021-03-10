import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Form as AntForm } from 'antd';
import FormTemplate from '@data-driven-forms/common/form-template';
import { childrenPropTypes } from '@data-driven-forms/common/prop-types-templates';

const { Title, Paragraph } = Typography;

const Form = ({ children, onSubmit, ...props }) => (
  <AntForm onFinish={onSubmit} {...props}>
    {children}
  </AntForm>
);

Form.propTypes = {
  layout: PropTypes.string,
  onSubmit: PropTypes.func,
  children: childrenPropTypes
};

Form.defaultProps = {
  layout: 'vertical'
};

const Description = ({ children, ...props }) => (
  <Typography {...props}>
    <Paragraph>{children}</Paragraph>
  </Typography>
);

Description.propTypes = {
  children: childrenPropTypes
};

const TitleComponent = ({ children, ...props }) => (
  <Typography {...props}>
    <Title level={3}>{children}</Title>
  </Typography>
);

TitleComponent.propTypes = {
  children: childrenPropTypes
};

const ButtonGroup = ({ children, ...props }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }} {...props}>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: childrenPropTypes
};

const ButtonComponent = ({ label, variant, children, buttonType, ...props }) => (
  <Button {...props} type="primary" htmlType={props.type}>
    {label || children}
  </Button>
);

ButtonComponent.propTypes = {
  children: childrenPropTypes,
  label: PropTypes.node,
  variant: PropTypes.string,
  buttonType: PropTypes.string,
  type: PropTypes.string
};

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

AntFormTemplate.propTypes = {
  layout: PropTypes.string,
  formWrapperProps: PropTypes.object
};

export default AntFormTemplate;
