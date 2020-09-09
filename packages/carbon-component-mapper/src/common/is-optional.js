import React from 'react';
import PropTypes from 'prop-types';

const IsOptional = ({ labelText, optionalText = '(optional)' }) => (
  <React.Fragment>
    {labelText} {optionalText}
  </React.Fragment>
);

IsOptional.propTypes = {
  labelText: PropTypes.node,
  optionalText: PropTypes.node
};

export default IsOptional;
