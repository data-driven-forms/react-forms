import React from 'react';
import GenericComponentText from './generic-mui-component';
import Pf3Select from '@docs/doc-components/pf3-select.md';
import Pf4Select from '@docs/doc-components/pf4-select.md';
import PropTypes from 'prop-types';

const Select = ({ activeMapper }) => (activeMapper === 'pf3' ? <Pf3Select /> : activeMapper === 'pf4' ? <Pf4Select /> : <GenericComponentText />);

Select.propTypes = {
  activeMapper: PropTypes.string
};

export default Select;
