import React from 'react';
import PropTypes from 'prop-types';

import { CircleNotchIcon, CaretDownIcon } from '@patternfly/react-icons';

const DropdownIndicator = ({ selectProps: { isFetching } }) => (isFetching ? <CircleNotchIcon className="spinning" /> : <CaretDownIcon />);

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    isFetching: PropTypes.bool
  }).isRequired
};

export default DropdownIndicator;
