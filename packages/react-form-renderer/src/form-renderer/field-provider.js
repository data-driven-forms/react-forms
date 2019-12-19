import React, { Component, Children } from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import enhancedOnChange from './enhanced-on-change';
import { dataTypes } from '../constants';

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
    if (component) {
      const FieldComponent = component;
      return <Field { ...props } render={ ({ input: { onChange, ...input }, ...fieldsProps }) => (
        <FieldComponent
          { ...fieldsProps }
          input={{
            ...input,
            onChange: (...args) => {
              enhancedOnChange(dataType, onChange, fieldsProps.meta.initial, this.props.formOptions.deletedValue, ...args);
            },
          }}
        />
      ) } />;
    }

    if (render) {
      return <Field { ...props } render={ ({ input: { onChange, ...input }, ...fieldsProps }) => render({
        ...fieldsProps,
        input: {
          ...input,
          onChange: (...args) => enhancedOnChange(dataType, onChange, fieldsProps.meta.initial, this.props.formOptions.deletedValue, ...args),
        },
      }) } />;
    }

    const ChildComponent = children;
    return (
      <Field { ...props }>
        { ({ input: { onChange, ...input }, ...fieldsProps }) =>
          Children.only(
            <ChildComponent
              { ...fieldsProps }
              input={{ ...input, onChange: (...args) => enhancedOnChange(dataType, onChange, fieldsProps.meta.initial, this.props.formOptions.deletedValue, ...args)  }}
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
    deletedValue: PropTypes.any,
  }),
  component: PropTypes.oneOfType(PropTypes.node, PropTypes.element, PropTypes.func),
  render: PropTypes.func,
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.element, PropTypes.func),
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

