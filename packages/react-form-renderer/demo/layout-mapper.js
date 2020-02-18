import React from 'react';
import layoutComponentTypes from '../src/components/layout-component-types';

const Button = ({ variant, label, ...rest }) => (
  <button
    style={{
      backgroundColor: variant === 'primary' ? 'red' : 'initial',
    }}
    { ...rest }
  >
    { label }
  </button>
);

const ButtonGroup = ({ children, ...rest }) => <div style={{ backgroundColor: 'ivory' }} { ...rest } >{ children }</div>;
const WrapperForm = ({ children, ...props }) => <form { ...props }>{ children }</form>;
const Title = ({ children }) => <h3>{ children }</h3>;
const Description = ({ children }) => <p>{ children }</p>;

const layoutMapper = {
  [layoutComponentTypes.FORM_WRAPPER]: WrapperForm,
  [layoutComponentTypes.BUTTON]: Button,
  [layoutComponentTypes.BUTTON_GROUP]: ButtonGroup,
  [layoutComponentTypes.TITLE]: Title,
  [layoutComponentTypes.DESCRIPTION]: Description,
};

export default layoutMapper;
