import React from 'react';
import Pf4 from '@docs/doc-components/pf4-dual-list.md';
import MUI from '@docs/doc-components/mui-dual-list.md';

import PropTypes from 'prop-types';

const DualListSelect = ({ activeMapper }) => {
  if (activeMapper === 'pf4') {
    return <Pf4 />;
  }

  if (activeMapper === 'mui') {
    return <MUI />;
  }

  return 'Not implemented yet';
};

DualListSelect.propTypes = {
  activeMapper: PropTypes.string
};

export default DualListSelect;
