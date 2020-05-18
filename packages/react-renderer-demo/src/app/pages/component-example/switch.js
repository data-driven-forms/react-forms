import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import SwitchText from '@docs/doc-components/switch';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import baseFieldProps from '../../src/helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.SWITCH,
      label: 'Switch',
      name: 'switch'
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'onText',
    type: 'string'
  },
  {
    name: 'offText',
    type: 'string'
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.SWITCH}
        schema={schema}
        ContentText={SwitchText}
        variants={variants}
        linkText="Switch"
      />
    </Fragment>
  );
};
