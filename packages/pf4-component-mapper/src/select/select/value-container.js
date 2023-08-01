import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './input';

const ValueContainer = ({ value, isMulti, placeholder, getInputProps, isSearchable, inputRef }) => {
  if (isMulti && isSearchable) {
    return (
      <Fragment>
        {value}
        <Input placeholder={placeholder} inputRef={inputRef} getInputProps={getInputProps} />
      </Fragment>
    );
  }

  if (!isMulti && isSearchable) {
    return <Input placeholder={placeholder} inputRef={inputRef} getInputProps={getInputProps} value={value} />;
  }

  return <span className="pf-v5-c-select__toggle-text">{value || placeholder}</span>;
};

ValueContainer.propTypes = {
  value: PropTypes.node,
  placeholder: PropTypes.node,
  isMulti: PropTypes.bool,
  getInputProps: PropTypes.func.isRequired,
  isSearchable: PropTypes.bool,
  inputRef: PropTypes.object,
};

export default ValueContainer;
