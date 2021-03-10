import React from 'react';
import PropTypes from 'prop-types';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const SubForm = ({ fields }) => {
  const formOptions = useFormApi();

  return <div>{formOptions.renderForm(fields, formOptions)}</div>;
};

SubForm.propTypes = {
  fields: PropTypes.array
};

export default SubForm;
