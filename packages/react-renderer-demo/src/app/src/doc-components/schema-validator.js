import React from 'react';
import FormRenderer, { componentTypes, DefaultSchemaError } from '@data-driven-forms/react-form-renderer';
import { FormTemplate, componentMapper } from '@data-driven-forms/pf4-component-mapper';

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
  <div className="pf4">
    <FormRenderer
      FormTemplate={FormTemplate}
      componentMapper={componentMapper}
      schema={schema}
      onSubmit={console.log}
      schemaValidatorMapper={schemaValidatorMapper}
    />
  </div>
);

export default SchemaValidationExample;
