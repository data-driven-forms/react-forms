import React from 'react';
import PropTypes from 'prop-types';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { Form, Toolbar, ToolbarGroup, ToolbarItem, Button, ActionGroup, Grid, TextContent, Text, TextVariants } from '@patternfly/react-core';
import { PlusIcon, CloseIcon } from '@patternfly/react-icons';
import './layout-components-styles.scss';

const Icon = ({ name }) => name === 'close' ? <CloseIcon /> : <PlusIcon />;

Icon.propTypes = {
  name: PropTypes.string,
};

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

const ColLayout = ({ children }) => <React.Fragment>{ children }</React.Fragment>;

ColLayout.propTypes = {
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

const ArrayFieldLayout = ({ children, ...props }) => <Grid className="field-array" { ...props } >{ children }</Grid>;

ArrayFieldLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const HelpBlockLayout = ({ children, ...props }) => <div { ...props } style={{ color: '#a30000' }} >{ children }</div>;

HelpBlockLayout.propTypes = {
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
  [layoutComponents.COL]: ColLayout,
  [layoutComponents.FORM_GROUP]: React.Fragment,
  [layoutComponents.BUTTON_GROUP]: ButtonGroupLayout,
  [layoutComponents.ICON]: Icon,
  [layoutComponents.ARRAY_FIELD_WRAPPER]: ArrayFieldLayout,
  [layoutComponents.HELP_BLOCK]: HelpBlockLayout,
  [layoutComponents.TITLE]: Title,
  [layoutComponents.DESCRIPTION]: Description,
};

export default layoutMapper;
