import React from 'react';
import PropTypes from 'prop-types';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const SubForm = ({ fields, component, title, description, TitleElement, DescriptionElement, TitleProps, DescriptionProps, ...rest }) => {
  const formOptions = useFormApi();

  return (
    <div {...rest}>
      {title && React.createElement(TitleElement, TitleProps, title)}
      {description && React.createElement(DescriptionElement, DescriptionProps, description)}
      {formOptions.renderForm(fields, formOptions)}
    </div>
  );
};

SubForm.propTypes = {
  fields: PropTypes.array,
  component: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  TitleElement: PropTypes.string,
  DescriptionElement: PropTypes.string,
  TitleProps: PropTypes.object,
  DescriptionProps: PropTypes.object
};

SubForm.defaultProps = {
  TitleElement: 'h5',
  DescriptionElement: 'p'
};

export default SubForm;
