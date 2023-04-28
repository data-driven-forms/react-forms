import React from 'react';
import ComponentText from '@docs/components/component-example-text';

import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.CHECKBOX,
      label: 'Checkbox',
      name: 'checkbox',
      options: [
        { label: 'Dog', value: '1' },
        { label: 'Cats', value: '2' },
        { label: 'Hamsters', value: '3' },
      ],
    },
  ],
};
const variants = [
  ...baseFieldProps,
  {
    name: 'options',
    type: 'array',
    required: false,
  },
];

const CheckboxMultiple = () => <ComponentText schema={schema} variants={variants} linkText="Checkbox multiple" />;

export default CheckboxMultiple;
