import React from 'react';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { FormGroup, ButtonGroup, Icon, HelpBlock, Form } from 'patternfly-react';
import Button from './button';

const ArrayFieldWrapper = ({ children }) => (
  <div style={{
    display: 'inline-block',
    width: '100%',
  }}>
    { children }
  </div>
);

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: ({ children, ...props }) => <Form { ...props } >{ children }</Form>,
  [layoutComponents.BUTTON]: ({ label, variant, children, ...props }) => <Button bsStyle={ variant } { ...props }>{ label || children }</Button>,
  [layoutComponents.COL]: ({ children, xs, ...rest }) => <div key={ rest.key || rest.name }>{ children }</div>,
  [layoutComponents.FORM_GROUP]: FormGroup,
  [layoutComponents.BUTTON_GROUP]: ({ children, ...props }) => <ButtonGroup className="pull-right" { ...props }>{ children }</ButtonGroup>,
  [layoutComponents.ICON]: props => <Icon { ...props } />,
  [layoutComponents.ARRAY_FIELD_WRAPPER]: ArrayFieldWrapper,
  [layoutComponents.HELP_BLOCK]: HelpBlock,
  [layoutComponents.TITLE]: ({ children }) => <h3>{ children }</h3>,
  [layoutComponents.DESCRIPTION]: ({ children }) => <p>{ children }</p>,
};

export default layoutMapper;
