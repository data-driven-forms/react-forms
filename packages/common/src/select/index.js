import React, { Component } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    return (
      <ReactSelect className={ this.props.classNamePrefix } { ...this.props } />
    );
  }
}

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  classNamePrefix: PropTypes.string.isRequired,
};

Select.defaultProps = {
  options: [],
};

const DataDrivenSelect = ({ multi, ...props }) => {
  const isMulti = props.isMulti || multi;
  const closeMenuOnSelect = !isMulti;
  return (
    <Select
      hideSelectedOptions={ false }
      isMulti={ isMulti }
      { ...props }
      closeMenuOnSelect={ closeMenuOnSelect }
    />
  );
};

DataDrivenSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  classNamePrefix: PropTypes.string.isRequired,
};

DataDrivenSelect.defaultProps = {
  placeholder: 'Choose...',
  isSearchable: false,
  isClearable: false,
};

export default DataDrivenSelect;
