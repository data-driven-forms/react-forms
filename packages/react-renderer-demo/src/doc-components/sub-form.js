import React from 'react';
import PropTypes from 'prop-types';
import SuirSubForm from './examples-texts/suir/suir-sub-form.md';
import CarbonSubForm from './examples-texts/carbon/carbon-sub-form.md';
import GenericMuiComponent from '../helpers/generic-mui-component';

const SubForm = ({ activeMapper }) => {
  if (activeMapper === 'suir') {
    return <SuirSubForm />;
  }

  if (activeMapper === 'carbon') {
    return <CarbonSubForm />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="sub-form" />;
};

SubForm.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default SubForm;
