import React, { Fragment } from 'react';
import FormRender, { layoutComponents } from '@data-driven-forms/react-form-renderer';

const wrapperStyles = {
  padding: 16,
  borderRadius: 4,
  backgroundColor: 'LavenderBlush',
};

const FormWrapper = ({ children, ...props }) => (<form style={ wrapperStyles } { ...props }>{ children }</form>);

const titleStyle = {
  color: 'HotPink',
  fontFamily: 'Roboto',
};

const Title = ({ children, ...props }) => <h1 style={ titleStyle }>{ children }</h1>;

const Description = ({ children, ...props }) => <p style={ titleStyle }>{ children }</p>;

const getButtonStyle = variant => ({
  fontFamily: 'Roboto',
  color: 'White',
  backgroundColor: variant === 'primary' ? 'OliveDrab' : 'RebeccaPurple',
  padding: '8px 16px',
  borderRadius: 4,
  cursor: 'pointer',
  border: 'none',
  marginRight: 4,
});

const Button = ({ children, label, variant, ...props }) => <button style={ getButtonStyle(variant) } { ...props }>{ label }</button>;

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-around',
};

const ButtonGroup = ({ children, ...props }) => (
  <div style={ buttonGroupStyle }>
    { children }
  </div>
);

const layoutComponent = {
  [layoutComponents.FORM_WRAPPER]: FormWrapper,
  [layoutComponents.BUTTON]: Button,
  [layoutComponents.COL]: Fragment,
  [layoutComponents.FORM_GROUP]: Fragment,
  [layoutComponents.BUTTON_GROUP]: ButtonGroup,
  [layoutComponents.ICON]: Fragment,
  [layoutComponents.ARRAY_FIELD_WRAPPER]: Fragment,
  [layoutComponents.HELP_BLOCK]: Fragment,
  [layoutComponents.TITLE]: Title,
  [layoutComponents.DESCRIPTION]: Description,
};

const LayoutMapper = () => {
  const schema = {
    fields: [],
    title: 'Empty form with layout mapper',
    description: 'If you want to see the source code, please expand the code example.',
  };
  return (
    <FormRender
      formFieldsMapper={{}}
      layoutMapper={ layoutComponent }
      schema={ schema }
      onSubmit={ console.log }
      onCancel={ () => console.log('cancel action') }
    />
  );
};

LayoutMapper.displayName = 'LayoutMapper';

export default LayoutMapper;
