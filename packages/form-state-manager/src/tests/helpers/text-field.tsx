import React from 'react';
import useField from '../../files/use-field';
import UseFieldConfig from '../../types/use-field';

export interface TextFieldProps {
  label: React.ReactNode;
  id: string;
}

const TextField: React.ComponentType<React.HTMLProps<HTMLInputElement> & TextFieldProps & UseFieldConfig> = ({ label, id, ...props }) => {
  const {
    input,
    meta: { valid, error, validating, touched },
    ...rest
  } = useField(props);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 16 }}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...input} {...rest} />
      {validating && <div>I am being validated</div>}
      {touched && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextField;
