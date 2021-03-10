import React from 'react';
import PropTypes from 'prop-types';

import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { H3, H4 } from '@blueprintjs/core';

import propsCatcher from '../props-catcher/props-catcher';

const SubForm = ({ title, description, fields, ...props }) => {
  const formOptions = useFormApi();

  return (
    <div {...propsCatcher(props)}>
      {title && <H3>{title}</H3>}
      {description && <H4>{description}</H4>}
      {formOptions.renderForm(fields, formOptions)}
    </div>
  );
};

SubForm.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.array
};

export default SubForm;
