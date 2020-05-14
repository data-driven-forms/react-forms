import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { Header } from 'semantic-ui-react';

const SubForm = ({ fields, title, description, component, ...rest }) => {
  const { renderForm } = useFormApi();

  return (
    <div {...rest}>
      {title && <Header>{title}</Header>}
      {description && <p>{description}</p>}
      <div>{renderForm(fields)}</div>
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
