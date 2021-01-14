import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';

const translateLabel = (id, locale = 'en') =>
  ({
    en: {
      name: 'User name',
      password: 'Password'
    },
    jp: {
      name: '名前',
      password: 'パスワード'
    }
  }[locale][id]);

const schema = {
  title: 'Action Mapper example (translated strings)',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'name',
      actions: {
        label: ['translateLabel', 'name', 'jp']
      }
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'password',
      actions: {
        label: ['translateLabel', 'password', 'jp']
      }
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const actionMapper = {
  translateLabel
};

const ActionMapper = () => (
  <FormRenderer FormTemplate={FormTemplate} actionMapper={actionMapper} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
);

export default ActionMapper;
