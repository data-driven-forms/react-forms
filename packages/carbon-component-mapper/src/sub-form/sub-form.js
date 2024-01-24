import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const useStyles = createUseStyles({
  subForm: {
    '&>:not(:last-child)': {
      marginBottom: 32,
    },
  },
});

const SubForm = ({
  fields,
  component,
  title,
  description,
  TitleElement = 'h3',
  DescriptionElement = 'p',
  TitleProps,
  DescriptionProps,
  HeaderProps,
  ...rest
}) => {
  const formOptions = useFormApi();
  const { tab } = useStyles();

  return (
    <div {...rest} className={clsx(tab, rest.className)}>
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
  HeaderProps: PropTypes.object,
};

export default SubForm;
