import React from 'react';
import { layoutComponents } from '../src/constants';

const Button = ({ variant, label, buttonType, ...rest }) => (
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
  [layoutComponents.FORM_WRAPPER]: WrapperForm,
  [layoutComponents.BUTTON]: Button,
  [layoutComponents.BUTTON_GROUP]: ButtonGroup,
  [layoutComponents.TITLE]: Title,
  [layoutComponents.DESCRIPTION]: Description,
};

export default layoutMapper;
