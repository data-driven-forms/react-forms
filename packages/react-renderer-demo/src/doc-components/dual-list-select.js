import React from 'react';
import PropTypes from 'prop-types';
import MuiDualListSelect from './examples-texts/mui/mui-dual-list-select.md';
import SuirDualListSelect from './examples-texts/suir/suir-dual-list-select.md';
import BlueprintDualListSelect from './examples-texts/blueprint/blueprint-dual-list-select.md';
import PF4DualListSelect from './examples-texts/pf4/pf4-dual-list.md';
import CarbonDualListSelect from './examples-texts/carbon/carbon-dual-list-select.md';

import GenericMuiComponent from '../helpers/generic-mui-component';

const DualListSelect = ({ activeMapper }) => {
  if (activeMapper === 'pf4') {
    return <PF4DualListSelect />;
  }

  if (activeMapper === 'mui') {
    return <MuiDualListSelect />;
  }

  if (activeMapper === 'suir') {
    return <SuirDualListSelect />;
  }

  if (activeMapper === 'blueprint') {
    return <BlueprintDualListSelect />;
  }

  if (activeMapper === 'carbon') {
    return <CarbonDualListSelect />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="dual-list-select" />;
};

DualListSelect.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default DualListSelect;
