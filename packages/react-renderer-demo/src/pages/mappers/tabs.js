import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import TabsText from '@docs/doc-components/tabs';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';

const schema = {
  fields: [
    {
      component: componentTypes.TABS,
      name: 'tabs',
      fields: [
        {
          component: componentTypes.TAB_ITEM,
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
          component: componentTypes.TAB_ITEM,
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

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.TABS}
        schema={schema}
        ContentText={TabsText}
        variants={variants}
        linkText="Tabs / Tab item"
      />
    </Fragment>
  );
};
