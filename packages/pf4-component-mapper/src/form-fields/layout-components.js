import React from 'react';
import PropTypes from 'prop-types';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { Form, Toolbar, ToolbarGroup, ToolbarItem, Button, ActionGroup, TextContent, Text, TextVariants } from '@patternfly/react-core';
import './layout-components-styles.scss';

const ButtonLayout = ({ label, bsStyle, children, ...props }) =>
  <ToolbarGroup className="data-driven-forms__pf4-button-group">
    <ToolbarItem>
      <Button variant={ bsStyle || 'secondary' } { ...props }>
        { label }{ children }
      </Button>
    </ToolbarItem>
  </ToolbarGroup>;

ButtonLayout.propTypes = {
  label: PropTypes.string.isRequired,
  bsStyle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const ButtonGroupLayout = ({ children, ...props }) =>
  <ActionGroup { ...props } >
    <Toolbar>
      { children }
    </Toolbar>
  </ActionGroup>;

ButtonGroupLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Title = ({ children }) => <TextContent>
  <Text component={ TextVariants.h1 }>{ children }</Text>
</TextContent>;

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Description = ({ children }) => <TextContent>
  <Text component={ TextVariants.p }>{ children }</Text>
</TextContent>;

Description.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: Form,
  [layoutComponents.BUTTON]: ButtonLayout,
  [layoutComponents.BUTTON_GROUP]: ButtonGroupLayout,
  [layoutComponents.TITLE]: Title,
  [layoutComponents.DESCRIPTION]: Description,
};

export default layoutMapper;
