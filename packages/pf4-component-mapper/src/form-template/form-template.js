import React from 'react';
import PropTypes from 'prop-types';

import FormTemplate from '@data-driven-forms/common/form-template';

import { Button as PF4Button, ActionGroup, Form, TextContent, Text, TextVariants } from '@patternfly/react-core';

export const Button = ({ label, bsStyle, children, disabled, buttonType, ...props }) => (
  <PF4Button variant={buttonType === 'cancel' ? 'link' : bsStyle || 'secondary'} isDisabled={disabled} {...props}>
    {label}
    {children}
  </PF4Button>
);

Button.propTypes = {
  label: PropTypes.node.isRequired,
  bsStyle: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  buttonType: PropTypes.string
};

export const ButtonGroup = ({ children, ...props }) => <ActionGroup {...props}>{children}</ActionGroup>;

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Title = ({ children, ...props }) => (
  <TextContent>
    <Text component={TextVariants.h1} {...props}>
      {children}
    </Text>
  </TextContent>
);

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Description = ({ children, ...props }) => (
  <TextContent>
    <Text component={TextVariants.p} {...props}>
      {children}
    </Text>
  </TextContent>
);

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

const PF4FormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default PF4FormTemplate;
