import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

import './sub-form.scss';

const SubForm = ({ fields, component, title, description, TitleElement, DescriptionElement, TitleProps, DescriptionProps, HeaderProps, ...rest }) => {
  const formOptions = useFormApi();

  return (
    <div {...rest} className={clsx('ddorg__carbon-sub-form', rest.className)}>
      {(title || description) && (
        <div {...HeaderProps}>
          {title && React.createElement(TitleElement, TitleProps, title)}
          {description && React.createElement(DescriptionElement, DescriptionProps, description)}
        </div>
      )}
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
  DescriptionProps: PropTypes.object,
  HeaderProps: PropTypes.object
};

SubForm.defaultProps = {
  TitleElement: 'h5',
  DescriptionElement: 'p'
};

export default SubForm;
