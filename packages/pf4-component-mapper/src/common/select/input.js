import React from 'react';
import { components } from 'react-select';
import PropTypes from 'prop-types';

const Input = (props) => <components.Input {...props} />;

Input.propTypes = {
  selectProps: PropTypes.shape({
    isMulti: PropTypes.bool
  }).isRequired
};

export default Input;
