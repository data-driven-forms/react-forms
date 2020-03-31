import React from 'react';
import Wizard from '@docs/doc-components/wizard.md';
import Pf3Wizard from '@docs/doc-components/pf3-wizard.md';
import Pf4Wizard from '@docs/doc-components/pf4-wizard.md';

import PropTypes from 'prop-types';

const DocWizard = ({ activeMapper }) => (activeMapper === 'pf3' ? <Pf3Wizard /> : activeMapper === 'pf4' ? <Pf4Wizard /> : <Wizard />);

DocWizard.propTypes = {
  activeMapper: PropTypes.string
};

export default DocWizard;
