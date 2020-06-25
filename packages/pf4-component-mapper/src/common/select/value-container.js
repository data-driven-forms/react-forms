import React from 'react';

const ValueContainer = ({ value, placeholder }) => {
  return <span className="pf-c-select__toggle-text">{value || placeholder}</span>;
};

export default ValueContainer;
