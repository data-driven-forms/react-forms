import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { Header } from 'semantic-ui-react';

const SubForm = ({
  fields,
  title,
  description,
  component,
  HeaderProps,
  DescriptionProps: { element: descriptionElement, ...DescriptionProps },
  FormFieldsGridProps: { element: formFieldsGridElement, ...FormFieldsGridProps },
  ...rest
}) => {
  const { renderForm } = useFormApi();

  return (
    <div {...rest}>
      {title && <Header {...HeaderProps}>{title}</Header>}
      {description && createElement(descriptionElement || 'p', DescriptionProps, description)}
      {createElement(formFieldsGridElement || 'div', FormFieldsGridProps, renderForm(fields))}
    </div>
  );
};

SubForm.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  component: PropTypes.any,
  HeaderProps: PropTypes.object,
  DescriptionProps: PropTypes.shape({ element: PropTypes.string.isRequired }),
  FormFieldsGridProps: PropTypes.shape({ element: PropTypes.string.isRequired })
};

SubForm.defaultProps = {
  HeaderProps: {},
  DescriptionProps: { element: 'p' },
  FormFieldsGridProps: { element: 'div' }
};

export default SubForm;
