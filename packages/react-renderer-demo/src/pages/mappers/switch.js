import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.SWITCH,
      label: 'Switch',
      name: 'switch'
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'onText',
    type: 'string'
  },
  {
    name: 'offText',
    type: 'string'
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Switch" />;
