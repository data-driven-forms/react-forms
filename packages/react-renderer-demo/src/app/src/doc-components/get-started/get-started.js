import React from 'react';
import FormRender, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper, FormTemplate } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  fields: [
    {
      name: 'first-name',
      label: 'First name',
      component: componentTypes.TEXT_FIELD,
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    },
    {
      name: 'last-name',
      label: 'Last name',
      component: componentTypes.TEXT_FIELD,
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    },
    {
      name: 'age',
      label: 'Age',
      component: componentTypes.TEXT_FIELD,
      type: 'number'
    }
  ]
};

const GetStartedForm = () => (
  <div className="pf4">
    <FormRender
      componentMapper={ componentMapper }
      FormTemplate={ FormTemplate }
      schema={ schema }
      onSubmit={ console.log }
      onCancel={ () => console.log('Cancel action') }
      canReset
    />
  </div>
);

export default GetStartedForm;
