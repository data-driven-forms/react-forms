import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

import DatePicker from '@data-driven-forms/mui-component-mapper/dist/cjs/date-picker';
import PlainText from '@data-driven-forms/mui-component-mapper/dist/cjs/plain-text';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';

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
      label: 'Are you older than 18 years?'
    },
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'field-2',
      label: 'Older than 18 years!',
      condition: { when: 'field-1', is: isFunction, desiredAge: 18 }
    }
  ]
};

const componentMapper = {
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.PLAIN_TEXT]: PlainText
};

const IsCondition = () => <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />;

export default IsCondition;
