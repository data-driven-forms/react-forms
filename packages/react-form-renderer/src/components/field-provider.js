import React from 'react';
import PropTypes from 'prop-types';

import dataTypes from './data-types';
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
  formOptions: PropTypes.shape({
    clearOnUnmount: PropTypes.bool,
    change: PropTypes.func,
    getFieldState: PropTypes.func,
    clearedValue: PropTypes.any
  }),
  clearedValue: PropTypes.any,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  dataType: PropTypes.oneOf(Object.values(dataTypes)),
  name: PropTypes.string,
  clearOnUnmount: PropTypes.bool,
  initializeOnMount: PropTypes.bool,
  initialValue: PropTypes.any
};

FieldProvider.defaultProps = {
  formOptions: {}
};

export default FieldProvider;
