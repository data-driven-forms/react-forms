import React from 'react';
import PF3 from '@docs/doc-components/pf3-slider.md';
import MUI from '@docs/doc-components/mui-slider.md';

import PropTypes from 'prop-types';

const DocSlider = ({ activeMapper }) => {
  if (activeMapper === 'pf3') {
    return <PF3 />;
  }

  if (activeMapper === 'mui') {
    return <MUI />;
  }

  return 'Not implemented yet';
};

DocSlider.propTypes = {
  activeMapper: PropTypes.string
};

export default DocSlider;
