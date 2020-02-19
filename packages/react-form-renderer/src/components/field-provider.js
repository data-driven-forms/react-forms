import React, { Component, Children } from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import enhancedOnChange from '../form-renderer/enhanced-on-change';
import dataTypes from './data-types';

class FieldProvider extends Component{
  componentDidMount() {
    if (this.props.initializeOnMount) {
      const initialValue = this.props.initialValue || this.props.formOptions.getFieldState(this.props.name).initial;
      this.props.formOptions.change(this.props.name, initialValue);
    }
  }

  componentWillUnmount(){
    if ((this.props.formOptions.clearOnUnmount || this.props.clearOnUnmount) && this.props.clearOnUnmount !== false) {
      this.props.formOptions.change(this.props.name, undefined);
    }
  }

  render(){
    const { clearOnUnmount, component, render, dataType, children, ...props } = this.props;
    const fieldClearedValue = props.hasOwnProperty('clearedValue') ? props.clearedValue : props.formOptions.clearedValue;
    const { clearedValue, ...fieldProps } = props;
    if (component) {
      const FieldComponent = component;
      return <Field { ...fieldProps } render={ ({ input: { onChange, ...input }, ...fieldsProps }) => (
        <FieldComponent
          { ...fieldsProps }
          input={{
            ...input,
            onChange: (...args) => {
              enhancedOnChange({
                ...fieldsProps.meta,
                dataType,
                onChange,
                clearedValue: fieldClearedValue,
              }, ...args);
            },
          }}
        />
      ) } />;
    }

    if (render) {
      return <Field { ...fieldProps } render={ ({ input: { onChange, ...input }, ...fieldsProps }) => render({
        ...fieldsProps,
        input: {
          ...input,
          onChange: (...args) =>
            enhancedOnChange({
              ...fieldsProps.meta,
              dataType,
              onChange,
              clearedValue: fieldClearedValue,
            }, ...args),
        },
      }) } />;
    }

    const ChildComponent = children;
    return (
      <Field { ...fieldProps }>
        { ({ input: { onChange, ...input }, ...fieldsProps }) =>
          Children.only(
            <ChildComponent
              { ...fieldsProps }
              input={{ ...input, onChange: (...args) =>
                enhancedOnChange({
                  ...fieldsProps.meta,
                  dataType,
                  onChange,
                  clearedValue: fieldClearedValue,
                }, ...args)  }}
            />
          ) }
      </Field>
    );
  }
}

FieldProvider.propTypes = {
  formOptions: PropTypes.shape({
    clearOnUnmount: PropTypes.bool,
    change: PropTypes.func,
    getFieldState: PropTypes.func,
    clearedValue: PropTypes.any,
  }),
  component: PropTypes.oneOfType([ PropTypes.node, PropTypes.element, PropTypes.func ]),
  render: PropTypes.func,
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.element, PropTypes.func ]),
  dataType: PropTypes.oneOf(Object.values(dataTypes)),
  name: PropTypes.string,
  clearOnUnmount: PropTypes.bool,
  initializeOnMount: PropTypes.bool,
  initialValue: PropTypes.any,
};

FieldProvider.defaultProps = {
  formOptions: {},
};

export default FieldProvider;

