import React from 'react';
import PropTypes from 'prop-types';

const ValueContainer = ({ value, placeholder }) => {
  return <span className="pf-c-select__toggle-text">{value || placeholder}</span>;
};

ValueContainer.propTypes = {
  value: PropTypes.node,
  placeholder: PropTypes.node
};

export default ValueContainer;
