import React from 'react';
import PropTypes from 'prop-types';

const ClearIndicator = ({ clearValue, innerProps: { ref, ...restInnerProps } }) => (
  <button {...restInnerProps} onClick={clearValue} className="ddorg__pf3-component-mapper__select__close-indicator">
    <i className="fa fa-times" />
  </button>
);

ClearIndicator.propTypes = {
  innerProps: PropTypes.object.isRequired,
  clearValue: PropTypes.func.isRequired
};

export default ClearIndicator;
