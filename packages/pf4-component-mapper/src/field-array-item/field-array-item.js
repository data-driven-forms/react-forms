import React from 'react';
import PropTypes from 'prop-types';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Grid, GridItem } from '@patternfly/react-core';

import './field-array-item.css';

const FieldArrayItem = ({ field, index, widths }) => {
  const { renderForm } = useFormApi();

  return (
    <Grid key={`${field.label}-${index}`} className="ddf-final-form-array-grid">
      {widths.label > 0 && (
        <GridItem sm={widths.label} key={`${field.label}-${index}`}>
          <label htmlFor={field.name}>
            {field.label}
            {field.isRequired && <span className="pf-c-form__label-required">*</span>}
          </label>
        </GridItem>
      )}
      <GridItem sm={widths.field}>{renderForm([field])}</GridItem>
    </Grid>
  );
};

FieldArrayItem.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    isRequired: PropTypes.bool,
  }),
  index: PropTypes.number,
  widths: PropTypes.shape({
    label: PropTypes.number,
    field: PropTypes.number,
  }),
};

export default FieldArrayItem;
