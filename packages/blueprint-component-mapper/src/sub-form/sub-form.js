import React from 'react';

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

export default SubForm;
