import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.SELECT,
      label: 'Select',
      name: 'select',
      simpleValue: true,
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
    type: 'array'
  },
  {
    name: 'noOptionsMessage',
    type: 'string'
  },
  {
    name: 'placeholder',
    type: 'string'
  },
  {
    name: 'isSearchable',
    type: 'boolean'
  },
  {
    name: 'isClearable',
    type: 'boolean'
  },
  {
    name: 'simpleValue',
    type: 'boolean'
  },
  {
    name: 'loadOptions',
    type: 'func'
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Select" />;
