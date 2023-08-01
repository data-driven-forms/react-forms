import React from 'react';
import PropTypes from 'prop-types';

const EmptyOptions = ({ noOptionsMessage, noResultsMessage, getInputProps, isSearchable, isFetching }) => {
  const { value } = getInputProps();
  const message = isFetching ? noOptionsMessage() : isSearchable && value ? noResultsMessage : noOptionsMessage();
  return <div className="pf-v5-c-select__menu-item pf-m-disabled">{message}</div>;
};

EmptyOptions.propTypes = {
  noOptionsMessage: PropTypes.func.isRequired,
  noResultsMessage: PropTypes.node.isRequired,
  getInputProps: PropTypes.func.isRequired,
  isSearchable: PropTypes.bool,
  isFetching: PropTypes.bool,
};

export default EmptyOptions;
