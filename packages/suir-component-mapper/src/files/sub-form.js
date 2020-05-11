import React from 'react';
import PropTypes from 'prop-types';

import { useFormApi } from '@data-driven-forms/react-form-renderer';
const SubForm = ({ fields, title, description, component, ...rest }) => {
  const { renderForm } = useFormApi();

  return (
    <div>
      {title && (
        <div item xs={12}>
          <h5 variant="h5">{title}</h5>
        </div>
      )}
      {description && (
        <div item xs={12}>
          <p>{description}</p>
        </div>
      )}
      <div item xs={12} container>
        {renderForm(fields)}
      </div>
    </div>
  );
};

SubForm.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  component: PropTypes.any
};

export default SubForm;
