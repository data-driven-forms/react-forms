import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      label: 'First name',
      name: 'first-name'
    }
  ]
};

const variants = [
  ...baseFieldProps,
  {
    name: 'placeholder',
    type: 'string'
  },
  {
    name: 'type',
    type: 'string'
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Text Field" />;
