import React from 'react';
import PropTypes from 'prop-types';

import FormTemplate from '@data-driven-forms/common/form-template';

export const Button = ({ label, buttonType, ...props }) => <button {...props}>{label}</button>;

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  buttonType: PropTypes.string
};

export const ButtonGroup = ({ children, ...props }) => <div {...props}>{children}</div>;

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Title = ({ children, ...props }) => <h1 {...props}>{children}</h1>;

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Description = ({ children, ...props }) => <div {...props}>{children}</div>;

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Form = ({ children, ...props }) => (
  <form noValidate {...props}>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

const WrappedFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default WrappedFormTemplate;
