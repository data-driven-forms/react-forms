import React from 'react';
import { layoutComponents } from '../src/constants';

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

const Col = ({ children, ...props }) => <div { ...props }>{ children }</div>;
const FormGroup = ({ children }) => <div style={{ backgroundColor: 'tomato' }} >{ children }</div>;
const ButtonGroup = ({ children }) => <div style={{ backgroundColor: 'ivory' }} >{ children }</div>;
const WrapperForm = ({ children, ...props }) => <form { ...props }>{ children }</form>;
const Title = ({ children }) => <h3>{ children }</h3>;
const Description = ({ children }) => <p>{ children }</p>;

const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: WrapperForm,
  [layoutComponents.BUTTON]: Button,
  [layoutComponents.COL]: Col,
  [layoutComponents.FORM_GROUP]: FormGroup,
  [layoutComponents.BUTTON_GROUP]: ButtonGroup,
  [layoutComponents.ICON]: props => <div>Icon</div>,
  [layoutComponents.ARRAY_FIELD_WRAPPER]: React.Fragment,
  [layoutComponents.HELP_BLOCK]: React.Fragment,
  [layoutComponents.TITLE]: Title,
  [layoutComponents.DESCRIPTION]: Description,
};

export default layoutMapper;
