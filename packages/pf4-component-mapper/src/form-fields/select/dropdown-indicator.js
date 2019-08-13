import React from 'react';
import PropTypes from 'prop-types';
import { CaretDownIcon, CircleNotchIcon } from '@patternfly/react-icons';

const DropdownIndicator = ({ selectProps: { isFetching }}) => isFetching ? <CircleNotchIcon className="spinning" /> : <CaretDownIcon />;

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    isFetching: PropTypes.bool,
  }).isRequired,
};

export default DropdownIndicator;
