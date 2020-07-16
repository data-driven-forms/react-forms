import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';

const Input = ({ inputRef, isSearchable, isDisabled, getInputProps, value, ...props }) => {
  const inputProps = getInputProps({ disabled: isDisabled });
  return (
    <input
      value=""
      {...props}
      className="pf-c-form-control pf-c-select__toggle-typeahead"
      ref={inputRef}
      {...{
        ...inputProps,
        value: inputProps.value || '',
        onChange: inputProps.onChange || Function
      }}
    />
  );
};

Input.propTypes = {
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  getInputProps: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default Input;
