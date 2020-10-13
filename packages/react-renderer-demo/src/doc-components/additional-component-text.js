import React from 'react';
import PropTypes from 'prop-types';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Checkbox = ({ activeMapper, component }) => {
  try {
    const Text = require(`@docs/doc-components/examples-texts/${activeMapper}/${component}.md`)?.default;

    return <Text />;
  } catch (err) {
    return <GenericMuiComponent activeMapper={activeMapper} component={component} />;
  }
};

Checkbox.propTypes = {
  activeMapper: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired
};

export default Checkbox;
