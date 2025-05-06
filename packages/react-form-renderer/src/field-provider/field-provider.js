import React from 'react';

import useFieldApi from '../use-field-api';

const FieldProvider = ({ Component, render, ...props }) => {
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
