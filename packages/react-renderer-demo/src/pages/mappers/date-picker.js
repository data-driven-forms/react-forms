import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import DatePickerText from '@docs/doc-components/date-picker';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
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

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.DATE_PICKER}
        schema={schema}
        ContentText={DatePickerText}
        variants={variants}
        linkText="Date picker"
      />
    </Fragment>
  );
};
