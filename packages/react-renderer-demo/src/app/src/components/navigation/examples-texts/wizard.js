import React from 'react';
import Wizard from '@docs/doc-components/wizard.md';
import Pf3Wizard from '@docs/doc-components/pf3-wizard.md';
import Pf4Wizard from '@docs/doc-components/pf4-wizard.md';

import PropTypes from 'prop-types';

const DocWizard = ({ activeMapper }) => {
  if (activeMapper === 'pf4') {
    return <Pf4Wizard />;
  }

  if (activeMapper === 'pf3') {
    return <Pf3Wizard />;
  }

  if (activeMapper === 'mui') {
    return <Wizard />;
  }

  return 'Not implemented yet';
};

DocWizard.propTypes = {
  activeMapper: PropTypes.string
};

export default DocWizard;
