import React from 'react';
import useField from '../../files/use-field';
import UseField from '../../types/use-field';

export interface TextFieldProps {
  label: React.ReactNode;
  id: string;
}

const TextField: React.ComponentType<React.HTMLProps<HTMLInputElement> & TextFieldProps & UseField> = ({ label, id, ...props }) => {
  const { input, ...rest } = useField(props);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 16 }}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...input} {...rest} />
    </div>
  );
};

export default TextField;
