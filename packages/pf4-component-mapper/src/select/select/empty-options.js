import React from 'react';

const EmptyOptions = ({ noOptionsMessage, noResultsMessage, getInputProps, isSearchable, isFetching }) => {
  const { value } = getInputProps();
  const message = isFetching ? noOptionsMessage() : isSearchable && value ? noResultsMessage : noOptionsMessage();
  return <div className="pf-v6-c-menu__item pf-m-disabled">{message}</div>;
};

export default EmptyOptions;
