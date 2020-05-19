import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import GenericMuiComponent from '@docs/doc-components/plain-text';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

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

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.PLAIN_TEXT}
        schema={schema}
        ContentText={GenericMuiComponent}
        variants={variants}
        linkText="Plain text"
      />
    </Fragment>
  );
};
