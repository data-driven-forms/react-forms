import React from 'react';
import PropTypes from 'prop-types';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { Button, FormGroup, Icon, HelpBlock, Form } from 'patternfly-react';
import './layout-components.scss';

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

const ButtonGroupWrapper = ({ children, className, ...props }) => (
  <div className={ `ddorg__pf3-layout-components__button-group ${className}` } { ...props }
  >
    { children }
  </div>
);

ButtonGroupWrapper.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
  className: PropTypes.string,
};

ButtonGroupWrapper.defaultProps = {
  className: '',
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
