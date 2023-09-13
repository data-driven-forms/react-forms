import React from 'react';
import PropTypes from 'prop-types';

import FormTemplate from '@data-driven-forms/common/form-template';
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';
import { Button as UI5Button, FlexBox, Form as UU5Form, FormItem } from '@ui5/webcomponents-react';

export const Button = ({ label, buttonType, type, ...props }) => (
  <UI5Button design="Transparent" {...props} {...(type === 'submit' && { submits: true, design: 'Emphasized' })}>
    {label}
  </UI5Button>
);

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  buttonType: PropTypes.string,
};

export const ButtonGroup = ({ children, ...props }) => (
  <FormItem {...props}>
    <FlexBox style={{ gap: 8, width: '100%' }} justifyContent="End">
      {children}
    </FlexBox>
  </FormItem>
);

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

export const Form = ({ children, ...props }) => <UU5Form {...props}>{children}</UU5Form>;

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const WrappedFormTemplate = (props) => (
  <FormTemplate
    formWrapperProps={{ ...props.formWrapperProps, titleText: props.schema.title }}
    FormWrapper={Form}
    Button={Button}
    ButtonGroup={ButtonGroup}
    Title={() => null}
    Description={() => null}
    {...props}
  />
);

export default WrappedFormTemplate;
