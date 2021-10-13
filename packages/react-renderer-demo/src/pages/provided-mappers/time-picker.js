import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import baseFieldProps from '../../helpers/base-field-props';
import updateFieldSchema from '../../helpers/update-field-schema';

const schema = {
  fields: [
    {
      component: componentTypes.TIME_PICKER,
      label: 'Time Picker',
      name: 'time-picker',
    },
  ],
};

const basicVariant = { schema, label: 'Basic', value: 'basic' };
const stringVariant = {
  schema: updateFieldSchema(schema, {
    useStringFormat: true,
    twelveHoursFormat: true,
    timezones: [
      { value: 'CET', label: 'Central european time' },
      { value: 'UTC', label: 'Universal Time Coordinated' },
    ],
  }),
  label: 'String',
  value: 'string',
};

const timezones = {
  schema: updateFieldSchema(schema, {
    twelveHoursFormat: true,
    timezones: [
      { label: 'UTC', value: 'UTC', showAs: 'UTC' },
      { label: 'EST', value: 'EAST', showAs: 'Pacific/Easter' },
    ],
  }),
  label: 'Timezones',
  value: 'timezones',
};

const schemaVariants = {
  carbon: [basicVariant, timezones, stringVariant],
};

const variants = [...baseFieldProps];

const TimePicker = () => <ComponentText schema={schema} variants={variants} linkText="Time picker" schemaVariants={schemaVariants} />;

export default TimePicker;
