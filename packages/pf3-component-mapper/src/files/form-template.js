import React from 'react';
import PropTypes from 'prop-types';
import { Button as PF3Button, Form } from 'patternfly-react';
import './form-template.scss';
import FormTemplate from '@data-driven-forms/common/src/form-template';

export const FormWrapper = ({ children, ...props }) => <Form {...props}>{children}</Form>;

FormWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
};

export const Button = ({ label, variant, children, buttonType, ...props }) => (
  <PF3Button bsStyle={variant} {...props}>
    {label || children}
  </PF3Button>
);

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  buttonType: PropTypes.string
};

export const ButtonGroup = ({ children, className, ...props }) => (
  <div className={`ddorg__pf3-layout-components__button-group ${className}`} {...props}>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string
};

ButtonGroup.defaultProps = {
  className: ''
};

export const Title = ({ children }) => <h1>{children}</h1>;

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
};

export const Description = ({ children }) => <p>{children}</p>;

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
};

const PF3FormTemplate = (props) => (
  <FormTemplate FormWrapper={FormWrapper} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default PF3FormTemplate;
