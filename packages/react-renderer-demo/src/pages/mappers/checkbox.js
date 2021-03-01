import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.CHECKBOX,
      label: 'Checkbox',
      name: 'checkbox'
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'options',
    type: 'array',
    required: false
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Checkbox" />;
