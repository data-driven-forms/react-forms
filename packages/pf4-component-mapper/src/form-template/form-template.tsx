import React from 'react';

import FormTemplate from '@data-driven-forms/common/form-template';

import { Button as PF4Button, ActionGroup, Form, Content, ContentVariants, Alert } from '@patternfly/react-core';
import {
  FormTemplateButtonProps,
  FormTemplateButtonGroupProps,
  FormTemplateTitleProps,
  FormTemplateDescriptionProps,
  FormTemplateFormErrorProps,
} from '../types';

export const Button: React.FC<FormTemplateButtonProps> = ({ label, bsStyle, children, disabled, buttonType, ...props }) => (
  <PF4Button variant={buttonType === 'cancel' ? 'link' : bsStyle || 'secondary'} isDisabled={disabled} {...props}>
    {label}
    {children}
  </PF4Button>
);

export const ButtonGroup: React.FC<FormTemplateButtonGroupProps> = ({ children, ...props }) => <ActionGroup {...props}>{children}</ActionGroup>;

export const Title: React.FC<FormTemplateTitleProps> = ({ children, ...props }) => (
  <Content>
    <Content component={ContentVariants.h1} {...props}>
      {children}
    </Content>
  </Content>
);

export const Description: React.FC<FormTemplateDescriptionProps> = ({ children, ...props }) => (
  <Content>
    <Content component={ContentVariants.p} {...props}>
      {children}
    </Content>
  </Content>
);

export const FormError: React.FC<FormTemplateFormErrorProps> = ({ formError, alertProps }) => {
  if (typeof formError === 'object' && formError && formError.title) {
    const { title, description, ...props } = formError;

    return (
      <Alert variant="danger" isInline title={title} {...props} {...alertProps}>
        {description}
      </Alert>
    );
  }

  if (typeof formError === 'string') {
    return <Alert variant="danger" isInline title={formError} {...alertProps} />;
  }

  return null;
};

const PF4FormTemplate: React.FC<any> = (props) => (
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

export default PF4FormTemplate;
