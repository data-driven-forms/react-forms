import React from 'react';
import PropTypes from 'prop-types';

import CaretDownIcon from '../../icons/caret-down-icon';
import CircleNotchIcon from '../../icons/circle-notch-icon';

const DropdownIndicator = ({ selectProps: { isFetching }}) => isFetching ? <CircleNotchIcon className="spinning" /> : <CaretDownIcon />;

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    isFetching: PropTypes.bool,
  }).isRequired,
};

export default DropdownIndicator;
