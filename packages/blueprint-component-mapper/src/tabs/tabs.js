import React from 'react';

import { Tab, Tabs as BTabs } from '@blueprintjs/core';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const Tabs = ({ component, name, fields, ...props }) => {
  const formOptions = useFormApi();

  return (
    <BTabs id={name} {...props}>
      {fields.map(({ name, title, fields }) => (
        <Tab key={name} id={name} title={title} panel={formOptions.renderForm(fields, formOptions)} />
      ))}
    </BTabs>
  );
};

export default Tabs;
