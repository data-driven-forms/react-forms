import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup } from '@ui5/webcomponents-react';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const SubForm = ({ fields, title, titleText }) => {
  const formOptions = useFormApi();

  return <FormGroup titleText={titleText || title}>{formOptions.renderForm(fields, formOptions)}</FormGroup>;
};

SubForm.propTypes = {
  fields: PropTypes.array,
  title: PropTypes.node,
  titleText: PropTypes.node,
};

export default SubForm;
