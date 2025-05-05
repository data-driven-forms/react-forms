import React, { createElement } from 'react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { Header } from 'semantic-ui-react';

const SubForm = ({
  fields,
  title,
  description,
  component,
  HeaderProps = {},
  DescriptionProps: { element: descriptionElement, ...DescriptionProps } = { element: 'p' },
  FormFieldsGridProps: { element: formFieldsGridElement, ...FormFieldsGridProps } = { element: 'div' },
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

export default SubForm;
