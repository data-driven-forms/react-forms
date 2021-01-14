import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import DefaultSchemaError from '@data-driven-forms/react-form-renderer/schema-errors';

import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'i-am-okey',
      label: 'I am label'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'need-label'
    }
  ]
};

const schemaValidatorMapper = {
  components: {
    [componentTypes.TEXT_FIELD]: (field) => {
      if (!field.label) {
        throw new DefaultSchemaError(`Missing label prop in "${field.name}" component`);
      }
    }
  }
};

const SchemaValidationExample = () => (
  <FormRenderer
    FormTemplate={FormTemplate}
    componentMapper={componentMapper}
    schema={schema}
    onSubmit={console.log}
    schemaValidatorMapper={schemaValidatorMapper}
  />
);

export default SchemaValidationExample;
