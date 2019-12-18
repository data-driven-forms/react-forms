import React from 'react';
import PropTypes from 'prop-types';

// TODO find icon for loading spinner

const DropdownIndicator = ({ selectProps: { isFetching }}) => isFetching
  ? <i className="ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-angle-down" />
  : <i className="ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-angle-down"/>;

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    isFetching: PropTypes.bool,
  }).isRequired,
};

export default DropdownIndicator;
