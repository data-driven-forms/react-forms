import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.DUAL_LIST_SELECT,
      name: 'dual-list-select',
      options: [
        {
          value: 'cats',
          label: 'cats'
        },
        {
          value: 'cats_1',
          label: 'cats_1'
        },
        {
          value: 'cats_2',
          label: 'cats_2'
        },
        {
          value: 'zebras',
          label: 'zebras'
        },
        {
          value: 'pigeons',
          label: 'pigeons'
        }
      ]
    }
  ]
};

const variants = [...baseFieldProps];

export default () => <ComponentText schema={schema} variants={variants} linkText="Dual list select" />;
