import React from 'react';
import PropTypes from 'prop-types';

import useFieldApi from './use-field-api';

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

FieldProvider.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  render: PropTypes.func
};

export default FieldProvider;
