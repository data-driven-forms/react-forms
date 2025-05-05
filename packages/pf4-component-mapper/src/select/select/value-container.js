import React, { Fragment } from 'react';
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

  return <span className="pf-v6-c-menu-toggle-text">{value || placeholder}</span>;
};

export default ValueContainer;
