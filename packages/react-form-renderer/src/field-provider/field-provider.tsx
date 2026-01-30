import React, { ComponentType } from 'react';
import useFieldApi, { UseFieldApiConfig } from '../use-field-api';

interface FieldProviderProps extends UseFieldApiConfig {
  Component?: ComponentType<any>;
  render?: (props: any) => React.ReactNode;
}

const FieldProvider: React.FC<FieldProviderProps> = ({ Component, render, ...props }) => {
  const fieldProviderProps = useFieldApi(props);

  if (Component) {
    return <Component {...fieldProviderProps} />;
  }

  if (render) {
    return render({ ...fieldProviderProps });
  }

  throw new Error('Field provider is missing either Component or render prop.');
};

export default FieldProvider;
