import React from 'react';
import PropTypes from 'prop-types';
import MuiTabs from './examples-texts/mui/mui-tabs.md';
import SuirTabs from './examples-texts/suir/suir-tabs.md';
import Pf4Tabs from './examples-texts/pf4/pf4-tabs.md';

import GenericMuiComponent from '../helpers/generic-mui-component';

const Tabs = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiTabs />;
  }

  if (activeMapper === 'suir') {
    return <SuirTabs />;
  }

  if (activeMapper === 'pf4') {
    return <Pf4Tabs />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="tabs" />;
};

Tabs.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default Tabs;
