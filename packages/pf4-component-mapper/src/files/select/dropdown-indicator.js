import React from 'react';
import PropTypes from 'prop-types';

import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';
import CircleNotchIcon from '@patternfly/react-icons/dist/js/icons/circle-notch-icon';

const DropdownIndicator = ({ selectProps: { isFetching } }) => (isFetching ? <CircleNotchIcon className="spinning" /> : <CaretDownIcon />);

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    isFetching: PropTypes.bool
  }).isRequired
};

export default DropdownIndicator;
