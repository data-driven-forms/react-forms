import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const DropdownIndicator = ({ selectProps: { isFetching, value } }) =>
  isFetching ? (
    <i
      className={clsx('ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-circle-o-notch spin', {
        placeholder: value?.length === 0
      })}
    />
  ) : (
    <i
      className={clsx('ddorg__pf3-component-mapper__select__dropdown-indicator fa fa-angle-down', {
        placeholder: value?.length === 0
      })}
    />
  );

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    isFetching: PropTypes.bool,
    value: PropTypes.any
  }).isRequired
};

export default DropdownIndicator;
