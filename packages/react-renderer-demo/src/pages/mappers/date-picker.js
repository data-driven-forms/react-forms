import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.DATE_PICKER,
      label: 'Date Picker',
      name: 'date-picker'
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'showTodayButton',
    type: 'boolean',
    required: false
  },
  {
    name: 'todayButtonLabel',
    type: 'string',
    required: false
  },
  {
    name: 'closeOnDaySelect',
    type: 'boolean',
    required: false
  },
  {
    name: 'isClearable',
    type: 'boolean',
    required: false
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Date picker" />;
