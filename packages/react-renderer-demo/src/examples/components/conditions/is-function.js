import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

import DatePicker from '@data-driven-forms/mui-component-mapper/date-picker';
import PlainText from '@data-driven-forms/mui-component-mapper/plain-text';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const calculateAge = (birthday) => {
  let ageDifMs = Date.now() - birthday;
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const isFunction = (value, config) => calculateAge(value) >= config.desiredAge;

const schema = {
  title: 'Is function condition',
  fields: [
    {
      component: componentTypes.DATE_PICKER,
      name: 'field-1',
      label: 'Are you older than 18 years?',
    },
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'field-2',
      label: 'Older than 18 years!',
      condition: { when: 'field-1', is: isFunction, desiredAge: 18 },
    },
  ],
};

const componentMapper = {
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.PLAIN_TEXT]: PlainText,
};

const IsCondition = () => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
  </LocalizationProvider>
);
IsCondition.displayName = 'IsCondition';

export default IsCondition;
