import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import GenericMuiComponent from '@docs/doc-components/textarea';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import baseFieldProps from '../../src/helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.TEXTAREA,
      label: 'Long text',
      name: 'long-text'
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'placeholder',
    type: 'string'
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <ComponentText
      component={componentTypes.TEXTAREA}
      activeMapper={activeMapper}
      schema={schema}
      ContentText={GenericMuiComponent}
      variants={variants}
      linkText="Textarea"
    />
  );
};
