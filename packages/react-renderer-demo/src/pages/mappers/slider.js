import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

const schema = {
  fields: [
    {
      component: componentTypes.SLIDER,
      name: 'slider',
      label: 'Distance',
      min: 1,
      max: 100,
      step: 1
    }
  ]
};

const variants = [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'label',
    type: 'string'
  },
  {
    name: 'helperText',
    type: 'string'
  },
  {
    name: 'description',
    type: 'string'
  },
  {
    name: 'min',
    type: 'number'
  },
  {
    name: 'max',
    type: 'number'
  },
  {
    name: 'step',
    type: 'number'
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Slider" />;
