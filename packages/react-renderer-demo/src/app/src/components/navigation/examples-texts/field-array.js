import React from 'react';
import MuiFieldArray from '@docs/doc-components/mui-field-array.md';
import PF4FieldArray from '@docs/doc-components/pf4-field-array.md';
import PF3FieldArray from '@docs/doc-components/pf3-field-array.md';

import PropTypes from 'prop-types';

const DocFieldArray = ({ activeMapper }) =>
  activeMapper === 'mui' ? <MuiFieldArray /> : activeMapper === 'pf4' ? <PF4FieldArray /> : <PF3FieldArray />;

DocFieldArray.propTypes = {
  activeMapper: PropTypes.string
};

export default DocFieldArray;
