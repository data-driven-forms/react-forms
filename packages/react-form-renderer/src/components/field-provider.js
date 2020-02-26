import React from 'react';
import PropTypes from 'prop-types';

import useFieldApi from '../hooks/use-field-api';

const FieldProvider = ({ component, render, ...props }) => {
  const fieldProviderProps = useFieldApi(props);
  if (component) {
    const FieldComponent = component;
    return <FieldComponent {...fieldProviderProps} />;
  }

  if (render) {
    return render({ ...fieldProviderProps });
  }

  throw new Error('Field provider is missing either component or render prop.');
};

FieldProvider.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  render: PropTypes.func
};

export default FieldProvider;
