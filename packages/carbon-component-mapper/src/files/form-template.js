import React from 'react';
import PropTypes from 'prop-types';

import { Form as CarbonForm, Button as CarbonButton, ButtonSet } from 'carbon-components-react';

import FormTemplate from '@data-driven-forms/common/src/form-template';

export const Button = ({ label, buttonType, ...props }) => (
  <CarbonButton kind={buttonType === 'submit' ? 'primary' : 'secondary'} {...props}>
    {label}
  </CarbonButton>
);

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  buttonType: PropTypes.string
};

export const ButtonGroup = ({ children, ...props }) => <ButtonSet {...props}>{children}</ButtonSet>;

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Title = ({ children }) => <h1>{children}</h1>;

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Description = ({ children }) => <div>{children}</div>;

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Form = ({ children, ...props }) => (
  <CarbonForm noValidate {...props}>
    {children}
  </CarbonForm>
);

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

const WrappedFormTemplate = (props) => (
  <FormTemplate
    FormWrapper={Form}
    Button={Button}
    ButtonGroup={ButtonGroup}
    Title={Title}
    Description={Description}
    buttonOrder={['cancel', 'reset', 'submit']}
    {...props}
  />
);

export default WrappedFormTemplate;
