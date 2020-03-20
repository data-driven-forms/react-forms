import React from 'react';
import PropTypes from 'prop-types';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { Button, Form } from 'patternfly-react';
import './layout-components.scss';

const FormWapper = ({ children, ...props }) => <Form { ...props } >{ children }</Form>;

FormWapper.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
};

const FormButton = ({ label, variant, children, buttonType, ...props }) => <Button bsStyle={ variant } { ...props }>{ label || children }</Button>;

FormButton.propTypes = {
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
  variant: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
  buttonType: PropTypes.string,
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

const TitleWrapper = ({ children }) => <h1>{ children }</h1>;

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
  [layoutComponents.BUTTON_GROUP]: ButtonGroupWrapper,
  [layoutComponents.TITLE]: TitleWrapper,
  [layoutComponents.DESCRIPTION]: DescriptionWrapper,
};

export default layoutMapper;
