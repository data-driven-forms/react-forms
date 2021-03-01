import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.TIME_PICKER,
      label: 'Time Picker',
      name: 'time-picker'
    }
  ]
};
const variants = [...baseFieldProps];

export default () => <ComponentText schema={schema} variants={variants} linkText="Time picker" />;
