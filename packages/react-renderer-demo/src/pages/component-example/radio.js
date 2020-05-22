import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import GenericMuiComponent from '@docs/doc-components/radio';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.RADIO,
      label: 'Radio',
      name: 'radio',
      options: [
        { label: 'Dogs', value: '1' },
        { label: 'Cats', value: '2' },
        { label: 'Hamsters', value: '3' }
      ]
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'options',
    type: 'array',
    required: false
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.RADIO}
        schema={schema}
        ContentText={GenericMuiComponent}
        variants={variants}
        linkText="Radio"
      />
    </Fragment>
  );
};
