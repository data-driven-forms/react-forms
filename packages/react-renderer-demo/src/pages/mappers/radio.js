import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.RADIO,
      label: 'Radio',
      name: 'radio',
      options: [
        { label: 'Dogs', value: '1' },
        { label: 'Cats', value: '2' },
        { label: 'Hamsters', value: '3' }
      ]
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

export default () => <ComponentText schema={schema} variants={variants} linkText="Radio" />;
