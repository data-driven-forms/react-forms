import React, { Component } from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

class FieldProvider extends Component{
  componentWillUnmount(){
    if ((this.props.formOptions.clearOnUnmount || this.props.clearOnUnmount) && this.props.clearOnUnmount !== false) {
      this.props.formOptions.change(this.props.name, undefined);
    }
  }

  render(){
    const { clearOnUnmount, ...props } = this.props;
    return <Field { ...props } />;
  }
}

FieldProvider.propTypes = {
  formOptions: PropTypes.shape({
    clearOnUnmount: PropTypes.bool,
    change: PropTypes.func,
  }),
  name: PropTypes.string,
  clearOnUnmount: PropTypes.bool,
};

FieldProvider.defaultProps = {
  formOptions: {},
};

export default FieldProvider;

