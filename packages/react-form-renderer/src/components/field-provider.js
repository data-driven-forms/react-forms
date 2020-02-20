import React, { useEffect } from 'react';
import { useField } from 'react-final-form';
import PropTypes from 'prop-types';

import enhancedOnChange from '../form-renderer/enhanced-on-change';
import dataTypes from './data-types';
import useFormApi from '../hooks/useFormApi';

const FieldProvider = ({ name, initializeOnMount, ...props }) => {
  const fieldProps = useField(name, props);
  const formOptions = useFormApi();
  useEffect(() => {
    if (initializeOnMount) {
      const initialValue = props.initialValue || fieldProps.meta.initial;
      fieldProps.input.onChange(initialValue);
    }

    return () => {
      if ((formOptions.clearOnUnmount || props.clearOnUnmount) && props.clearOnUnmount !== false) {
        fieldProps.input.onChange(undefined);
      }
    };
  }, []);

  const fieldClearedValue = props.hasOwnProperty('clearedValue') ? props.clearedValue : formOptions.clearedValue;
  if (props.component) {
    const FieldComponent = props.component;
    return (
      <FieldComponent
        {...props}
        formOptions={formOptions}
        {...fieldProps}
        input={{
          ...fieldProps.input,
          onChange: (...args) => {
            enhancedOnChange(
              {
                ...fieldProps.meta,
                dataType: props.dataType,
                onChange: fieldProps.input.onChange,
                clearedValue: fieldClearedValue
              },
              ...args
            );
          }
        }}
      />
    );
  }

  if (props.render) {
    return props.render({
      ...props,
      formOptions,
      ...fieldProps,
      input: {
        ...fieldProps.input,
        onChange: (...args) =>
          enhancedOnChange(
            {
              ...fieldProps.meta,
              dataType: props.dataType,
              onChange: fieldProps.input.onChange,
              clearedValue: fieldClearedValue
            },
            ...args
          )
      }
    });
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
