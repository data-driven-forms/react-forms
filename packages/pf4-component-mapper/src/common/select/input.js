import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';

const getInputLabel = (value) => {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === 'object' ? item.label : item)).join(',');
  }

  if (typeof value === 'object') {
    return value.label;
  }

  return value;
};

const Input = ({ value, inputRef, isSearchable, ...props }) => {
  return (
    <input
      {...props}
      {...(!isSearchable && { tabIndex: '-1' })}
      className="ddorg__pf4-component-mapper__select-input"
      value={getInputLabel(value)}
      onClick={console.log}
      ref={inputRef}
    />
  );
};

Input.propTypes = {};

export default Input;
