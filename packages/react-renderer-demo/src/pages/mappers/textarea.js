import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.TEXTAREA,
      label: 'Long text',
      name: 'long-text'
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'placeholder',
    type: 'string'
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Textarea" />;
