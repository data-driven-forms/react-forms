import React from 'react';
import PropTypes from 'prop-types';

const SubForm = ({
  formOptions,
  fields,
  title,
  description,
  FieldProvider: _FieldProvider,
  validate: _validate,
  ...rest
}) => (
  <div { ...rest }>
    { title && <h3>{ title }</h3> }
    { description && <p>{ description }</p> }
    { formOptions.renderForm(fields, formOptions) }
  </div>
);

SubForm.propTypes = {
  formOptions: PropTypes.object.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  FieldProvider: PropTypes.any,
  validate: PropTypes.any,
};

export default SubForm;
