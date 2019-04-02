import React from 'react';
import PropTypes from 'prop-types';

const RequiredLabel = ({ label }) => (
  <React.Fragment>
    <span style={{ color: '#ff0000' }}>* </span> { label }
  </React.Fragment>
);

RequiredLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default RequiredLabel;
