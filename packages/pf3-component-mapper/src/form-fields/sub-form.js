import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SubForm = ({
  formOptions,
  fields,
  title,
  description,
}) => (
  <Fragment>
    { title && <h3>{ title }</h3> }
    { description && <p>{ description }</p> }
    { formOptions.renderForm(fields, formOptions) }
  </Fragment>
);

SubForm.propTypes = {
  formOptions: PropTypes.object.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SubForm;
