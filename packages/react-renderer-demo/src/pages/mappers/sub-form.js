import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

const schema = {
  fields: [
    {
      component: componentTypes.SUB_FORM,
      title: 'Subform',
      description: 'This is a subform',
      name: 'subform',
      fields: [
        {
          name: 'carrot',
          label: 'Carrot',
          component: componentTypes.TEXT_FIELD
        }
      ]
    }
  ]
};
const variants = [
  {
    name: 'title',
    type: 'string'
  },
  {
    name: 'description',
    type: 'string'
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Subform" />;
