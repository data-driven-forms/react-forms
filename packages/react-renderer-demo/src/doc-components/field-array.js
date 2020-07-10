import React from 'react';
import PropTypes from 'prop-types';
import MuiFieldArray from './examples-texts/mui/mui-field-array.md';
import Pf4FieldArray from './examples-texts/pf4/pf4-field-array.md';
import Pf3FieldArray from './examples-texts/pf3/pf3-field-array.md';
import SuirFieldArray from './examples-texts/suir/suir-field-array.md';
import BlueprintFieldArray from './examples-texts/blueprint/blueprint-field-array.md';
import GenericMuiComponent from '../helpers/generic-mui-component';
import AntFieldArray from './examples-texts/ant/ant-field-array.md';
const FieldArray = ({ activeMapper }) => {
  if (activeMapper === 'mui') {
    return <MuiFieldArray />;
  }

  if (activeMapper === 'pf4') {
    return <Pf4FieldArray />;
  }

  if (activeMapper === 'pf3') {
    return <Pf3FieldArray />;
  }

  if (activeMapper === 'suir') {
    return <SuirFieldArray />;
  }

  if (activeMapper === 'blueprint') {
    return <BlueprintFieldArray />;
  }

  if (activeMapper === 'ant') {
    return <AntFieldArray />;
  }

  return <GenericMuiComponent activeMapper={activeMapper} component="field-array" />;
};

FieldArray.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default FieldArray;
