import React from 'react';
import Pf4 from '@docs/doc-components/pf4-dual-list.md';
import PropTypes from 'prop-types';

const DualListSelect = ({ activeMapper }) => (activeMapper === 'pf4' ? <Pf4 /> : 'Not implemented yet');

DualListSelect.propTypes = {
  activeMapper: PropTypes.string
};

export default DualListSelect;
