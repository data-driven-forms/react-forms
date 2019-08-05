import React from 'react';
import PropTypes from 'prop-types';
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

const FormWapper = ({ children, ...props }) => <Form { ...props } >{ children }</Form>;

FormWapper.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
};

const FormButton = ({ label, variant, children, ...props }) => <Button bsStyle={ variant } { ...props }>{ label || children }</Button>;

FormButton.propTypes = {
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
  variant: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
};

const ButtonGroupWrapper = ({ children, ...props }) => (
  <ButtonGroup
    className="pull-right"
    style={{ display: 'inline-block' }}
    { ...props }
  >
    { children }
  </ButtonGroup>
);

ButtonGroupWrapper.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
};

const TitleWrapper = ({ children }) => <h3>{ children }</h3>;

TitleWrapper.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
};

const DescriptionWrapper = ({ children }) => <p>{ children }</p>;

DescriptionWrapper.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
};

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: FormWapper,
  [layoutComponents.BUTTON]: FormButton,
  [layoutComponents.COL]: ({ children, xs, ...rest }) => <div key={ rest.key || rest.name }>{ children }</div>, // TO BE removed
  [layoutComponents.FORM_GROUP]: FormGroup,
  [layoutComponents.BUTTON_GROUP]: ButtonGroupWrapper,
  [layoutComponents.ICON]: props => <Icon { ...props } />, // TO BE removed
  [layoutComponents.ARRAY_FIELD_WRAPPER]: ArrayFieldWrapper, // TO BE removed
  [layoutComponents.HELP_BLOCK]: HelpBlock,
  [layoutComponents.TITLE]: TitleWrapper,
  [layoutComponents.DESCRIPTION]: DescriptionWrapper,
};

export default layoutMapper;
