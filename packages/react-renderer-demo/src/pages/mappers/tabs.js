import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';

const schema = {
  fields: [
    {
      component: componentTypes.TABS,
      name: 'tabs',
      fields: [
        {
          validateFields: ['apple'],
          name: '1',
          title: 'Fruits',
          description: 'Here you can find fruits',
          fields: [
            {
              name: 'apple',
              label: 'Apple',
              title: 'Apple',
              component: componentTypes.TEXT_FIELD,
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
        },
        {
          name: '2',
          title: 'Vegetables',
          description: 'Here you can find vegetables',
          fields: [
            {
              name: 'carrot',
              label: 'Carrot',
              title: 'Carrot',
              component: componentTypes.TEXT_FIELD
            }
          ]
        }
      ]
    }
  ]
};
const variants = [];

export default () => <ComponentText schema={schema} variants={variants} linkText="Tabs / Tab item" />;
