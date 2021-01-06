import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

const schema = {
  fields: [
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'plain-text-component',
      label: `Lorem ipsum sem velit. Mauris scelerisque tortor sed lorem dapibus, bibendum scelerisque ligula consequat. Quisque fringilla luctus.
Vestibulum vulputate inceptos himenaeos.`
    }
  ]
};

const variants = [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'label',
    type: 'string',
    required: true
  }
];

export default () => <ComponentText schema={schema} variants={variants} linkText="Plain text" />;
