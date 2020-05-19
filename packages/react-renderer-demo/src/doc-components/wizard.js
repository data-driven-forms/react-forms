import React from 'react';
import PropTypes from 'prop-types';
import MuiWizard from './examples-texts/mui/mui-wizard.md';
import Pf4Wizard from './examples-texts/pf4/pf4-wizard.md';
import Pf3Wizard from './examples-texts/pf3/pf3-wizard.md';
import SuirWizard from './examples-texts/suir/suir-wizard.md';
import BlueprintWizard from './examples-texts/blueprint/blueprint-wizard.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const Wizard = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiWizard />;
  }

  if (activeMapper === 'pf4') {
    return <Pf4Wizard />;
  }

  if (activeMapper === 'pf3') {
    return <Pf3Wizard />;
  }

  if (activeMapper === 'suir') {
    return <SuirWizard />;
  }

  if (activeMapper === 'blueprint') {
    return <BlueprintWizard />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="wizard" />;
};

Wizard.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Wizard;
